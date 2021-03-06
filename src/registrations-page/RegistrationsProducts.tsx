import React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import ProductLabel from '../core/ProductLabel';
import {
  Registration,
  RegistrationStatus,
} from '../register-page/register.type';

import './RegistrationsProducts.scss';

interface RegistrationsProductsProps {
  registrations: Registration[];
}

function getProductCount(
  productName: string,
  registrations: Registration[],
): number {
  return (
    registrations
      // Only consider current registrations
      .filter(regs => regs.status === RegistrationStatus.CURRENT)
      // Only look in the products for each registration.
      .map(regs => regs.products)
      // Sum all the counts for a given product.
      .reduce((total, products) => {
        const productCount = products[productName];
        if (!productCount) {
          return total;
        }

        // To support both number and string because the Registration
        // type is quirky.
        return total + parseInt(productCount.toString(), 10);
      }, 0)
  );
}

const RegistrationsProducts = ({
  registrations,
}: RegistrationsProductsProps) => {
  const getProduct = (productName: string): number =>
    getProductCount(productName, registrations);

  return (
    <Segment className="RegistrationsProducts">
      <Table
        className="RegistrationsProducts__Table"
        basic="very"
        celled={true}
        collapsing={true}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="dinner" />
            </Table.Cell>
            <Table.Cell>{getProduct('dinner')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="vegetarian" />
            </Table.Cell>
            <Table.Cell>{getProduct('vegetarian')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="dinnerKid" />
            </Table.Cell>
            <Table.Cell>{getProduct('dinnerKid')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="vegetarianKid" />
            </Table.Cell>
            <Table.Cell>{getProduct('vegetarianKid')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="breakfast" />
            </Table.Cell>
            <Table.Cell>{getProduct('breakfast')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="picknick" />
            </Table.Cell>
            <Table.Cell>{getProduct('picknick')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table
        className="RegistrationsProducts__Table"
        basic="very"
        celled={true}
        collapsing={true}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="sleepingAtGym" />
            </Table.Cell>
            <Table.Cell>
              {// Both products are under the same category
              getProduct('sleeping') + getProduct('sleepingAtGym')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <ProductLabel name="camping" />
            </Table.Cell>
            <Table.Cell>{getProduct('camping')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default RegistrationsProducts;
