Feature: Commemorative dates
  Scenario: New Year
    Given the user are in date "2020-01-02T12:10:45.500Z"
    When open the page
    Then show title "New Year"
    Then show subtitle "Happy New Year!"

  Scenario: Easter Day
    Given the user are in date "2020-03-31T12:10:45.500Z"
    When open the page
    Then show title "Easter"
    Then show subtitle ""

  Scenario: Halloween
    Given the user are in date "2020-10-31T12:10:45.500Z"
    When open the page
    Then show title "Halloween"
    Then show subtitle ""

  Scenario: Astronomy day
    Given the user are in date "2020-12-02T12:10:45.500Z"
    When open the page
    Then show title "Astronomy Day"
    Then show subtitle ""

  Scenario: Christmas Eve
    Given the user are in date "2020-12-24T12:10:45.500Z"
    When open the page
    Then show title "Christmas Eve"
    Then show subtitle ""

  Scenario: Christmas
    Given the user are in date "2010-12-25T12:10:45.500Z"
    When open the page
    Then show title "Christmas"
    Then show subtitle "Merry Christmas!!"

  Scenario: New Year's Eve
    Given the user are in date "2010-12-31T12:10:45.500Z"
    When open the page
    Then show title "New Year's Eve"
    Then show subtitle "A new year is coming!"
