Feature: Landing page navigation

  Scenario: User can open the landing page
    Given the website is running
    When the user visits the landing page
    Then the landing page should load

  Scenario: User can open the signup page
    Given the website is running
    When the user visits the signup page
    Then the signup page should load

  Scenario: User can open the login page
    Given the website is running
    When the user visits the login page
    Then the login page should load

  Scenario: User can open the guest chat page
    Given the website is running
    When the user visits the guest chat page
    Then the guest chat page should load

  Scenario: Landing page shows create account option
    Given the website is running
    When the user visits the landing page
    Then the create account button should be visible

  Scenario: Landing page shows guest access option
    Given the website is running
    When the user visits the landing page
    Then the guest access button should be visible