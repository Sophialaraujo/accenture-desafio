import 'cypress-file-upload';

export class WebTables {
  firstNameField() {
    return cy.get('#firstName');
  }

  lastNameField() {
    return cy.get('#lastName');
  }

  userEmailField() {
    return cy.get('#userEmail');
  }

  ageField() {
    return cy.get('#age');
  }

  salaryField() {
    return cy.get('#salary');
  }

  departmentField() {
    return cy.get('#department');
  }

  submitButton() {
    return cy.get('#submit');
  }

  setFirstName(firstName) {
    this.firstNameField().type(firstName);
  }

  setLastName(lastName) {
    this.lastNameField().type(lastName);
  }

  setUserEmail(userEmail) {
    this.userEmailField().type(userEmail);
  }

  setAge(age) {
    this.ageField().type(age);
  }

  setSalary(salary) {
    this.salaryField().type(salary);
  }

  setDepartment(department) {
    this.departmentField().type(department);
  }

  submitForm() {
    this.submitButton().click();
  }
}
