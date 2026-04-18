// Mock data for LabGuard system

/**
 * @typedef {Object} Equipment
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} model
 * @property {string} serialNumber
 * @property {string} location
 * @property {'Available' | 'In Use' | 'Maintenance' | 'Reserved'} status
 * @property {number} totalQuantity
 * @property {number} availableQuantity
 * @property {string} imageUrl
 * @property {string} description
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {string} equipmentId
 * @property {string} equipmentName
 * @property {string} userId
 * @property {string} userName
 * @property {string} userRole
 * @property {'Borrow' | 'Return'} type
 * @property {'Pending' | 'Approved' | 'Denied' | 'Completed'} status
 * @property {string} requestDate
 * @property {string} [approvalDate]
 * @property {string} [returnDate]
 * @property {number} quantity
 * @property {string} purpose
 * @property {string} [approvedBy]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {'success' | 'warning' | 'info' | 'error'} type
 * @property {string} title
 * @property {string} message
 * @property {string} date
 * @property {boolean} read
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'Student' | 'Instructor' | 'Lab Assistant' | 'Administrator'} role
 * @property {string} department
 * @property {string} [studentId]
 * @property {string} imageUrl
 */

export const mockEquipment = [
  {
    id: 'eq-001',
    name: 'Arduino Uno R3',
    category: 'Microcontrollers',
    model: 'UNO R3',
    serialNumber: 'ARD-UNO-001',
    location: 'Lab A - Shelf 3',
    status: 'Available',
    totalQuantity: 25,
    availableQuantity: 18,
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop',
    description: 'Arduino Uno R3 microcontroller board based on ATmega328P'
  },
  {
    id: 'eq-002',
    name: 'Oscilloscope DSO-X 2024A',
    category: 'Measurement Tools',
    model: 'DSO-X 2024A',
    serialNumber: 'OSC-2024-001',
    location: 'Lab B - Station 5',
    status: 'In Use',
    totalQuantity: 8,
    availableQuantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    description: '200 MHz, 4-channel digital storage oscilloscope'
  },
  {
    id: 'eq-003',
    name: 'Multimeter Fluke 87V',
    category: 'Measurement Tools',
    model: 'Fluke 87V',
    serialNumber: 'FLK-87V-001',
    location: 'Lab A - Cabinet 2',
    status: 'Available',
    totalQuantity: 15,
    availableQuantity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop',
    description: 'Industrial digital multimeter with temperature measurement'
  },
  {
    id: 'eq-004',
    name: 'Raspberry Pi 4 Model B',
    category: 'Microcomputers',
    model: 'Pi 4B 8GB',
    serialNumber: 'RPI4-8GB-001',
    location: 'Lab C - Shelf 1',
    status: 'Available',
    totalQuantity: 20,
    availableQuantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop',
    description: 'Raspberry Pi 4 Model B with 8GB RAM'
  },
  {
    id: 'eq-005',
    name: 'Soldering Station',
    category: 'Tools',
    model: 'Weller WE1010',
    serialNumber: 'SOL-WE1010-001',
    location: 'Lab A - Workbench',
    status: 'Maintenance',
    totalQuantity: 10,
    availableQuantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    description: 'Digital soldering station with adjustable temperature'
  },
  {
    id: 'eq-006',
    name: '3D Printer Prusa i3 MK3S',
    category: '3D Printing',
    model: 'MK3S+',
    serialNumber: '3DP-MK3S-001',
    location: 'Lab D - 3D Printing Area',
    status: 'Reserved',
    totalQuantity: 5,
    availableQuantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1606822238239-a9e249e0f61c?w=400&h=300&fit=crop',
    description: 'Original Prusa i3 MK3S+ 3D printer with multi-material upgrade'
  },
  {
    id: 'eq-007',
    name: 'Power Supply DC',
    category: 'Power Equipment',
    model: 'PS-3030D',
    serialNumber: 'PWR-3030-001',
    location: 'Lab B - Station 3',
    status: 'Available',
    totalQuantity: 12,
    availableQuantity: 9,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
    description: 'Adjustable DC power supply 0-30V, 0-30A'
  },
  {
    id: 'eq-008',
    name: 'Logic Analyzer',
    category: 'Measurement Tools',
    model: 'LA-2016',
    serialNumber: 'LOG-2016-001',
    location: 'Lab B - Shelf 2',
    status: 'Available',
    totalQuantity: 6,
    availableQuantity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    description: '16-channel logic analyzer with 200MHz sampling rate'
  }
];

export const mockTransactions = [
  {
    id: 'txn-001',
    equipmentId: 'eq-001',
    equipmentName: 'Arduino Uno R3',
    userId: 'usr-001',
    userName: 'Ahmad Khalil',
    userRole: 'Student',
    type: 'Borrow',
    status: 'Approved',
    requestDate: '2026-03-20T09:30:00',
    approvalDate: '2026-03-20T10:15:00',
    quantity: 2,
    purpose: 'IoT Project - Smart Home System',
    approvedBy: 'Dr. Sarah Hassan'
  },
  {
    id: 'txn-002',
    equipmentId: 'eq-002',
    equipmentName: 'Oscilloscope DSO-X 2024A',
    userId: 'usr-001',
    userName: 'Ahmad Khalil',
    userRole: 'Student',
    type: 'Borrow',
    status: 'Pending',
    requestDate: '2026-03-22T14:20:00',
    quantity: 1,
    purpose: 'Signal Analysis Lab Assignment'
  },
  {
    id: 'txn-003',
    equipmentId: 'eq-003',
    equipmentName: 'Multimeter Fluke 87V',
    userId: 'usr-002',
    userName: 'Layla Ahmad',
    userRole: 'Student',
    type: 'Return',
    status: 'Completed',
    requestDate: '2026-03-18T11:00:00',
    approvalDate: '2026-03-18T11:30:00',
    returnDate: '2026-03-21T15:45:00',
    quantity: 1,
    purpose: 'Circuit Testing',
    approvedBy: 'Eng. Mohammad Ali'
  },
  {
    id: 'txn-004',
    equipmentId: 'eq-004',
    equipmentName: 'Raspberry Pi 4 Model B',
    userId: 'usr-001',
    userName: 'Ahmad Khalil',
    userRole: 'Student',
    type: 'Borrow',
    status: 'Denied',
    requestDate: '2026-03-19T10:00:00',
    approvalDate: '2026-03-19T16:30:00',
    quantity: 3,
    purpose: 'Personal Project',
    approvedBy: 'Dr. Sarah Hassan'
  },
  {
    id: 'txn-005',
    equipmentId: 'eq-006',
    equipmentName: '3D Printer Prusa i3 MK3S',
    userId: 'usr-003',
    userName: 'Omar Nasser',
    userRole: 'Student',
    type: 'Borrow',
    status: 'Approved',
    requestDate: '2026-03-21T13:15:00',
    approvalDate: '2026-03-21T14:00:00',
    quantity: 1,
    purpose: 'Senior Project - Mechanical Part Prototyping',
    approvedBy: 'Dr. Khaled Ibrahim'
  }
];

export const mockNotifications = [
  {
    id: 'notif-001',
    type: 'success',
    title: 'Request Approved',
    message: 'Your borrow request for Arduino Uno R3 has been approved.',
    date: '2026-03-20T10:15:00',
    read: false
  },
  {
    id: 'notif-002',
    type: 'error',
    title: 'Request Denied',
    message: 'Your request for Raspberry Pi 4 has been denied. Reason: Insufficient academic justification.',
    date: '2026-03-19T16:30:00',
    read: false
  },
  {
    id: 'notif-003',
    type: 'warning',
    title: 'Return Reminder',
    message: 'Please return Arduino Uno R3 by March 27, 2026.',
    date: '2026-03-22T09:00:00',
    read: false
  },
  {
    id: 'notif-004',
    type: 'info',
    title: 'New Equipment Available',
    message: 'Logic Analyzer LA-2016 is now available in Lab B.',
    date: '2026-03-21T08:30:00',
    read: true
  }
];

export const currentUser = {
  name: "Ahmad Khalil",
  email: "ahmad.admin.khalil@htu.edu.jo",
  studentId: "20210123",
  department: "Electrical Engineering",
  role: "admin", // Options: "student", "instructor", "lab-assistant", "admin"
  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
};
