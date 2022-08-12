import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownMenu() {
  return (
    <Dropdown className="d-block d-md-none mt-5 ml-5">
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
