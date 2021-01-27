/// <reference types="Cypress" />

import { pageConfig } from '../../src/constants';

describe('Home page', () => {
  afterEach(() => {
    cy.clearCookies();
  });

  before(() => {
    cy.visit('/');
  });

  it('shows spinner on load', () => {
    cy.get('[data-cy=container]').find('[data-cy=loader]');
  });

  it('shows page on display after load', () => {
    cy.get('[data-cy=header]').as('header');

    cy.get('@header').find('[data-cy=title]').contains('COVID-19 Tracker');
    cy.get('@header').find('[data-cy=search]');
  });

  it('should have a working search bar (countries)', () => {
    cy.get('[data-cy=content]').as('content');
    cy.get('[data-cy=search]').as('search');

    cy.get('@search').type('usa');
    cy.get('@content').find('[data-cy=tableBody]').contains('tr', 'USA');

    // reset to none
    cy.get('@search').find('input').clear();
  });

  it('should be able to filter by continents', () => {
    cy.get('[data-cy=filterDropdown]')
      .click()
      .find('.item')
      .contains('Continents')
      .click();

    cy.get('[data-cy=content]')
      .find('.card')
      .should($card => {
        expect($card).to.have.length(6);
      });
  });

  it('should have a working search bar (continents)', () => {
    cy.get('[data-cy=content]').as('content');
    cy.get('[data-cy=search]').as('search');

    cy.get('@search').type('eur');
    cy.get('@content').find('.card').contains('Europe');

    // reset to none
    cy.get('@search').find('input').clear();
  });

  it('should be able to view countries in continent', () => {
    cy.get('[data-cy=content]').as('content');

    cy.get('@content')
      .find('.card')
      .find('button')
      .contains('Show countries')
      .click();

    // 39 countries listed under North America
    cy.get('@content')
      .find('[data-cy=tableBody]')
      .find('tr')
      .should($rows => expect($rows).to.have.length(39));
  });

  it('should display specific continent details in header', () => {
    cy.get('[data-cy=header]').contains('North America');
  });

  it('should return to home page (countries view) on click of back button', () => {
    cy.get('[data-cy=backButton]').click();

    cy.get('[data-cy=header]').contains('Global Statistics');
  });

  it('should handle lazy load properly on scroll down', () => {
    cy.get('[data-cy=content]').as('content');

    cy.get('@content')
      .find('[data-cy=tableBody]')
      .find('tr')
      .should($rows => expect($rows).to.have.length(pageConfig.NUMBER_OF_ROWS));

    cy.get('[data-cy=footer]').scrollIntoView();

    // loads another 35 rows
    cy.get('@content')
      .find('[data-cy=tableBody]')
      .find('tr')
      .should($rows => expect($rows).to.have.length(pageConfig.NUMBER_OF_ROWS * 2));
  });
});
