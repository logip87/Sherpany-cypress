import { generateFakeUserData, FakeUserData } from '../../support/methods/generate-data'
import { loginSelectors } from '../../support/selectors/login'
import { commonSelectors } from '../../support/selectors/common'

const user: FakeUserData = generateFakeUserData()

describe('Login form tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Login with invalid email shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  })

  it('Login with no data entered shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clearElement(loginSelectors.inputs.email)
    cy.clearElement(loginSelectors.inputs.password)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  })

  it('Login as not registered user shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, "We couldn't log you in. Please check your email address and password and try again.")
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  })

  it('Login with no password shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.clearElement(loginSelectors.inputs.password)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, "We couldn't log you in. Please check your email address and password and try again.")
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  })

  it('Login with no email entered shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  })

  it('Clear input after invalid credentials shows no validation errors', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clearElement(loginSelectors.inputs.email)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.clickOn(loginSelectors.buttons.login)
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
    cy.clearElement(loginSelectors.inputs.email)
    cy.clearElement(loginSelectors.inputs.password)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, false);
    cy.checkIfElementIsNotDisplayed(commonSelectors.alerts.errorMessage)
  })

  it('User is able to show the password', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, false)
    cy.clickOn(loginSelectors.buttons.showHide)
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, true)
    cy.clickOn(loginSelectors.buttons.showHide)
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, false)
  })

  it('User is able to clear email input', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct)
    cy.clickOn(loginSelectors.buttons.inputClear)
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email)
  })
})

describe('Login page lanuage change', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Change language to Italiano', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, 'Italiano')
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Accedere')
  })

  it('Change language to Français', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, 'Français')
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "S'identifier")
  })

  it('Change language to Deutsch', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, 'Deutsch')
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Anmelden')
  })
})

describe('Login in with SSO', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('User is able to switch to password login', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.checkIfElementIsVisible(loginSelectors.buttons.loginWithPassword)
    cy.clickOn(loginSelectors.buttons.loginWithPassword)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.checkIfElementIsVisible(loginSelectors.inputs.password)
  })

  it('Login with no email shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.clearElement(loginSelectors.inputs.email)
    cy.clickOn(loginSelectors.buttons.loginWithSSO)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
  })

  it('Login with invalid email shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain)
    cy.clickOn(loginSelectors.buttons.loginWithSSO)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'Please enter a valid email address.')
  })

  it('Login with valid email with no SSO provider shows proper validation message', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.clickOn(loginSelectors.buttons.loginWithSSO)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'We could not find any SSO provider based on that email address.')
  })

  it('Clear input after invalid details shows no validation errors', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.clickOn(loginSelectors.buttons.loginWithSSO)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(commonSelectors.alerts.errorMessage, 'We could not find any SSO provider based on that email address.')
    cy.clearElement(loginSelectors.inputs.email)
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
    cy.checkIfElementIsNotDisplayed(commonSelectors.alerts.errorMessage)
  })

  it('User is able to clear email input', () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in')
    cy.clickOn(loginSelectors.buttons.ssoLogin)
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, 'Log in with SSO')
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct)
    cy.clickOn(loginSelectors.buttons.inputClear)
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email)
  })
})