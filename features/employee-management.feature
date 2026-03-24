@employee
Feature: OrangeHRM Employee Management

  Background:
    Given the user is logged in as "testadmin" with password "Vibetestq@123"
    And the user navigates to PIM module

  Scenario: Add a new employee with mandatory fields
    When the user clicks on Add Employee button
    And the user enters first name "John"
    And the user enters last name "Doe"
    And the user saves the new employee
    Then the employee profile page should be displayed
    And a success toast message should be visible

  Scenario: Add a new employee with Employee ID
    When the user clicks on Add Employee button
    And the user enters first name "Jane"
    And the user enters last name "Smith"
    And the user enters employee id "EMP-001"
    And the user saves the new employee
    Then the employee profile page should be displayed
    And a success toast message should be visible

  Scenario: Search for an existing employee by name
    When the user is on the Employee List page
    And the user enters search name "John"
    And the user clicks the search button
    Then the employee list should display results
    And the employee "John" should appear in the search results

  Scenario: Search employee by Employee ID
    When the user is on the Employee List page
    And the user enters employee id in search "EMP-001"
    And the user clicks the search button
    Then the employee list should display results

  Scenario: Search employee returns no results
    When the user is on the Employee List page
    And the user enters search name "ZZZNonExistentEmployee999"
    And the user clicks the search button
    Then the no records found message should be displayed

  Scenario Outline: Add multiple employees
    When the user clicks on Add Employee button
    And the user enters first name "<firstName>"
    And the user enters last name "<lastName>"
    And the user saves the new employee
    Then the employee profile page should be displayed

    Examples:
      | firstName | lastName  |
      | Alice     | Johnson   |
      | Bob       | Williams  |
      | Carol     | Brown     |
