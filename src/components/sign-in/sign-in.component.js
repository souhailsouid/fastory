import React, { useState } from 'react'
import { connect } from 'react-redux'
import { emailSignInStart } from 'redux/user/user.actions'

import FormInput from 'components/ui/form-input/form-input.component.js'
import CustomButtom from 'components/ui/custom-button/custom-button.component'

import { AlertFadelessExample } from 'components/ui/alert/alert.component.js'

import './sign-in.styles.css'

const SignIn = ({ user, emailSignInStart }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { username, password } = form
    await emailSignInStart(username, password)
  }
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="sign-in">
      {user.error && (
        <AlertFadelessExample message={user.error} color="error" />
      )}
      <h2 className="message-verification">
        Prouves-nous que tu n&apos;es pas de l&apos;empire{' '}
        <span role="img" aria-label="emoji">
          👋
        </span>
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="text"
          value={form.username}
          label="Nom d'utilisateur"
          handleChange={handleChange}
          required
        />

        <FormInput
          name="password"
          type="password"
          value={form.password}
          label="Mot de passe"
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButtom type="submit">On verifie !</CustomButtom>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ user: state.user })

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (username, password) => {
    dispatch(emailSignInStart({ username, password }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
