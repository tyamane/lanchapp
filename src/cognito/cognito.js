import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'
import { Config, CognitoIdentityCredentials } from 'aws-sdk'

export default class Cognito {
  configure (config) {
    console.log("cognito configure")
    if (config.userPool) {
      this.userPool = config.userPool
    } else {
      this.userPool = new CognitoUserPool({
        UserPoolId: config.UserPoolId,
        ClientId: config.ClientId
      })
    }
    Config.region = config.region
    Config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })
    this.options = config
  }
  created = function () {
    console.log("cognito created")
  }

  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$cognito', {
      get () { return this.$root._cognito }
    })

    Vue.mixin({
      beforeCreate () {
        console.log("cognito mixin beforeCreate")
        if (this.$options.cognito) {
          this._cognito = this.$options.cognito
          this._cognito.configure(options)
        }
      }
    })

  }
  /**
   * username, passwordでサインアップ
   * username = emailとしてUserAttributeにも登録
   */
  signUp (username, password) {
    const dataEmail = { Name: 'email', Value: username }
    const attributeList = []
    attributeList.push(new CognitoUserAttribute(dataEmail))
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err)
          console.log("signup reject:" + err.toString())
        } else {
          resolve(result)
          console.log("signup:" + result.toString())
        }
      })
    })
  }
  /**
   * 確認コードからユーザーを有効化する
   */
  confirmation (username, confirmationCode) {
    const userData = { Username: username, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err)
          console.log("confirmation:"+ err)
        } else {
          resolve(result)
          console.log("confirmation:"+ result)
        }
      })
    })
  }

  /**
   * username, passwordでログイン
   */
  login (username, password) {
    const userData = { Username: username, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)
    const authenticationData = { Username: username, Password: password }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log("result: ", result);
          console.log("gCognitoUser: ", cognitoUser);
          const accessToken = result.getAccessToken().getJwtToken();
          console.log("Login succeeded!\n");
          console.log("\naccessToken: " + accessToken);
          this.bAuthenticated = true;
          resolve(result)
        },
        onFailure: (err) => {
          this.bAuthenticated_ = false;
          reject(err)
        }
      })
    })
  }

  /**
   * ログアウト
   */
  logout () {
    if (this.userPool.getCurrentUser()){
      console.log( 'logout:'+this.userPool.getCurrentUser() )
      this.userPool.getCurrentUser().signOut()
      this.bAuthenticated_ = false;
    }
    else{
      console.log("logout: nobody logged in.")
    }
  }
    /**
   * パスワードをリセット
   */
  resetPassword (username) {
    const userData = { Username: username, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword( {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
        }
      })
    })
  }
  /**
   * 確認コードによってパスワードを再設定する
  */
  confirmPassword (username, confirmationCode, newPassword) {
    const userData = { Username: username, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(confirmationCode, newPassword, (err, result) => {
        if (err) {
          reject(err)
          console.log("confirmation:"+ err)
        } else {
          resolve(result)
          console.log("confirmation:"+ result)
        }
      })
    })
  }
  /**
   * ログインしているかの判定
   */
  isAuthenticated () {
    const cognitoUser = this.userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) { reject(cognitoUser) }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
        } else {
          if (!session.isValid()) {
            reject(session)
          } else {
            console.log("isAuthenticated: user logged in.")
            resolve(session)
          }
        }
      })
    })
  }
}
