Feature: Login Test
    
    Scenario: Signup Success
        Given I am on landing page with signup form opened
        When I fill with correct values and send signup form
        Then new account is created