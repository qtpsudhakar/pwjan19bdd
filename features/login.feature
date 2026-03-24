@login
Feature: OrangeHRM Login

  Background:
    Given the user navigates to OrangeHRM login page

  Scenario: Successful login with valid credentials
    When the user enters username "testadmin"
    And the user enters password "Vibetestq@123"
    And the user clicks the login button
    Then the user should be redirected to the dashboard
    And the dashboard header should be visible

  Scenario: Failed login with invalid credentials
    When the user enters username "invalid_user"
    And the user enters password "wrong_password"
    And the user clicks the login button
    Then an error message should be displayed

  Scenario: Login with empty credentials
    When the user clicks the login button
    Then validation messages should be displayed for required fields
