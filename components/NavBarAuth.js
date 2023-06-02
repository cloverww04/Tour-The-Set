/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar className="navBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Tour-The-Set!</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/movie/new">
              <Nav.Link className="custom-logo">Add Movie</Nav.Link>
            </Link>
            <Link passHref href="/favorites">
              <Nav.Link className="custom-logo">Favorites</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button variant="danger" onClick={signOut}>Sign Out</Button>
    </Navbar>
  );
}
