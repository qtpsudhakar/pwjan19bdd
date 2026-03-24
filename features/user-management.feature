@user-management
Feature: OrangeHRM User Management

  Background:
    Given the user is logged in as "testadmin" with password "Vibetestq@123"
    And the user navigates to Admin module

  Scenario: Create a new Admin user
    When the user clicks on Add User button
    And the user selects user role "Admin"
    And the user selects employee name "John Doe"
    And the user enters new username "john.doe.admin"
    And the user selects status "Enabled"
    And the user enters user password "Admin@1234"
    And the user confirms the password "Admin@1234"
    And the user saves the new user
    Then a success toast message should be visible
    And the user list page should be displayed

  Scenario: Create a new ESS user
    When the user clicks on Add User button
    And the user selects user role "ESS"
    And the user selects employee name "Jane Smith"
    And the user enters new username "jane.smith.ess"
    And the user selects status "Enabled"
    And the user enters user password "Ess@1234"
    And the user confirms the password "Ess@1234"
    And the user saves the new user
    Then a success toast message should be visible
    And the user list page should be displayed

  Scenario: Search user by username
    When the user is on the User Management page
    And the user enters username to search "john.doe.admin"
    And the user clicks the search button
    Then the user list should display results
    And the username "john.doe.admin" should appear in the results

  Scenario: Search user by user role
    When the user is on the User Management page
    And the user selects user role filter "Admin"
    And the user clicks the search button
    Then the user list should display results
    And all displayed users should have role "Admin"

  Scenario: Search user by status
    When the user is on the User Management page
    And the user selects status filter "Enabled"
    And the user clicks the search button
    Then the user list should display results

  Scenario: Search user returns no results
    When the user is on the User Management page
    And the user enters username to search "zzz_nonexistent_user_999"
    And the user clicks the search button
    Then the no records found message should be displayed

  Scenario: Reset user search filters
    When the user is on the User Management page
    And the user enters username to search "someuser"
    And the user clicks the reset button
    Then the search filters should be cleared
