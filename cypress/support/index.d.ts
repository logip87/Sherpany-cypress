/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      fillInputField(selector: string, value: string): Chainable<Element>
      clickOn(selector: string): Chainable<Element>
      checkIfTextIsShown(selector: string, text: string): Chainable<Element>
      checkIfElementIsNotDisplayed(selector: string): Chainable<Element>
      clearElement(selector: string): Chainable<Element>
      checkElementContainsValue(selector: string, value: string): Chainable<Element>
      selectLanguage(selector: string, value: string): Chainable<Element>
      checkIfInputHasAnError(selector: string, value: boolean): Chainable<Element>
      checkIfElementIsVisible(selector: string): Chainable<Element>
      checkIfPasswordIsVisible(selector: string, isVisible: boolean): Chainable<Element>
      checkIfInputIsEmpty(selector: string): Chainable<Element>
  }
}