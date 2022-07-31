import Layout from "../../components/Layout"

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

interface UserDetailProps {
  user: User
}

export default function UserDetail(props: UserDetailProps) {
  const { user } = props;
  return (
    <Layout pageTitle="User Detail">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const dataUsers = await res.json()

  const paths = dataUsers.map((user: User) => {
    return {
      params: {
        id: `${user.id}`,
      }
    }
  })
  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    id: string
  }
}

export async function getStaticProps(context: GetStaticProps) {
  const { id } = context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await res.json()

  return {
    props: {
      user,
    }
  };
}
