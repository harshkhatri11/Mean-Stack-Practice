import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {
    state: 'userProfileDetails',
    name: 'Dashboard',
    icon: 'dashboard',
    role: 'ROLE_ADMIN',
  },
  {
    state: 'ems/manage-employee',
    name: 'EMS',
    icon: 'manage_accounts',
    role: 'ROLE_ADMIN',
  },
  {
    state: 'bill',
    name: 'View Bill',
    icon: 'import_contacts',
    role: 'ROLE_ADMIN',
  },
  {
    state: 'pipe',
    name: 'Pipes',
    icon: 'view_timeline',
    role: 'ROLE_ADMIN',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
