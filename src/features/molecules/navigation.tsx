import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = () => {
  const routes = [
    {
      id: 1,
      name: 'Главная',
      to: '/',
    },
    {
      id: 2,
      name: 'Документация',
      to: '/documentation',
    },
  ];
  return (
    <Breadcrumbs aria-label='breadcrumb' separator='-'>
      {routes.map((r) => (
        <LinkElem key={r.id} to={r.to} exact>
          {r.name}
        </LinkElem>
      ))}
    </Breadcrumbs>
  );
};

const LinkElem = styled(NavLink)`
  outline: none;
  text-decoration: none;
  color: #000;
  &.active {
    color: #f50057;
  }
`;
