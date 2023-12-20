Feature: Login Test
    
    Scenario: Login Success
        Given I am on landing page with login form opened
        When I send login form with correct credentials
        Then I am logged in