import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import useAuthHook from '../../api/auth'
import useUserRolesHook from '../../api/userRoles'
import { inputEmail, inputPassword } from '../../utils/dynamicForm'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const Login = () => {
  let [searchParams] = useSearchParams()
  const pathName = searchParams.get('next') || '/'
  const navigate = useNavigate()

  const { auth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { setAuth } = useAuth()

  const { postLogin } = useAuthHook()
  const { postUserRoleById } = useUserRolesHook({
    page: 1,
    q: '',
    limit: 10000000,
  })

  const { isLoading, isError, error, mutateAsync, isSuccess, data } = postLogin
  const {
    mutateAsync: userRoleMutateAsync,
    data: userRole,
    error: errorUserRole,
    isError: isErrorUserRole,
  } = postUserRoleById

  useEffect(() => {
    if (isSuccess) {
      userRoleMutateAsync(data._id)
      if (userRole) {
        localStorage.setItem('userRole', JSON.stringify(userRole))
        localStorage.setItem('userInfo', JSON.stringify(data))

        setAuth({
          userInfo: data,
          userRole: userRole,
        })
        navigate(pathName)
      }
    }
  }, [isSuccess, userRole])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  return (
    <>
      <FormContainer>
      <p className="text-left">
            Hi. This is Egor Kovalev.<br/>
            Sorry for choose like this way to contact you.<br/>
            As you can see, I am a Russian.<br/>
            I am living in Vladivostok now, far away from my home to avoid noisy and terrible war.<br/>
            I think, you can imagine why it is. I am really want peace.<br/>
            Anyway, I have many problem in working, because of I am Russian.<br/>
            For example, there are limitation in using bank, payment system.<br/>
            Such a limitation also exist in freelancer.com.<br/>
            I hope to keep in touch with you via email or any communication tool you want. I prefer slack or skype.<br/>
            superdev0919@gmail.com is my work email.<br/>
            I would like to hear from you soon.<br/>
            Thanks.<br/>
          </p>
        <Helmet>
          <title>Login</title>
          <meta property='og:title' content='Login' key='title' />
        </Helmet>
        <h3 className='fw-light font-monospace text-center'>Sign In</h3>
        {isError && <Message variant='danger'>{error}</Message>}
        {isErrorUserRole && <Message variant='danger'>{errorUserRole}</Message>}

        <form onSubmit={handleSubmit(submitHandler)}>
          {inputEmail({
            register,
            errors,
            label: 'Email',
            name: 'email',
            placeholder: 'Email',
          })}
          {inputPassword({
            register,
            errors,
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
          })}
          <button
            type='submit'
            className='btn btn-primary form-control '
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='spinner-border spinner-border-sm' />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className='row pt-3'>
          <div className='col'>
            <Link to='/auth/forgot-password' className='ps-1'>
              Forgot Password?
            </Link>
          </div>
        </div>
      </FormContainer>
    </>
  )
}

export default Login
