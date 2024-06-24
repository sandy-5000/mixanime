import Container from "/src/components/Login/Container"
import AuthLayout from "/src/layouts/AuthLayout"

const Login = () => {
  return (
    <AuthLayout>
      <div className="w-full h-full a-center p-5">
        <Container />
      </div>
    </AuthLayout>
  )
}

export default Login
