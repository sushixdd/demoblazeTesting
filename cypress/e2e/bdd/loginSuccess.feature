Feature: Sample Test
    
    Scenario: Login Success
        Given I am on landing page
        When I send login form with correct credentials
        Then I am logged in