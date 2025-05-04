'use client'
import { FaBox,FaUsers,FaClipboardList,FaTruck,FaCog,FaChartLine,FaChartPie,FaPlusCircle,FaList,FaFileInvoiceDollar,FaExchangeAlt,FaShoppingCart,FaInfoCircle,FaReceipt,FaWallet,FaUserMd,FaUserInjured,FaMoneyBillWave,FaReceipt as FaCashRegister,FaCalendarAlt,FaTools,FaFileMedical,FaKeyboard,FaPills,FaStethoscope,FaCalendarCheck,FaCalendarDay,FaCalendarPlus,FaProcedures,FaBed,FaHeartbeat,FaFlask,FaHome,FaBoxOpen,FaBoxes,FaShoppingBasket,FaHistory,FaTruckLoading,FaGift,FaMoneyBill,FaUniversity,FaBook,FaUserTie,FaBalanceScale,FaBuilding,FaDatabase,FaKey,FaPuzzlePiece,FaProjectDiagram,} from 'react-icons/fa'
import SidebarItem, { SidebarItemType } from './SidebarItem'
import path from 'path'

const sidebarData: SidebarItemType[] = [
    {
      title: 'Master Data',
      children: [
        { title: 'Products', path: '/master/products', icon: <FaBox /> },
        { title: 'Customers', path: '/master/customers', icon: <FaUsers /> },
        { title: 'Suppliers', path: '/master/suppliers', icon: <FaTruck /> },
        { title: 'Users & Roles', path: '/master/users&roles', icon: <FaUsers /> },
        { title: 'Company Settings', path: '/master/settings', icon: <FaCog /> },
      ],
    },
    {
      title: 'Pharmacy',
      children: [
        {
          title: 'Dashboard',
          path: '/pharmacy/dashboard',
          icon: <FaChartLine />,
        },
        {
          title: 'Report Summary',
          children: [
            { title: 'Summary 1', path: '/pharmacy/dashboard/summary1', icon: <FaChartPie /> },
            { title: 'Summary 2', path: '/pharmacy/dashboard/summary2', icon: <FaChartPie /> },
          ],
        },
        {
          title: 'Products',
          children: [
            { title: 'Add New Product', path: '/pharmacy/products/add', icon: <FaPlusCircle /> },
            { title: 'View Available Products', path: '/pharmacy/products/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Suppliers',
          children: [
            { title: 'Add New Supplier', path: '/pharmacy/suppliers/add', icon: <FaPlusCircle /> },
            { title: 'View Suppliers', path: '/pharmacy/suppliers/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Customer',
          children: [
            { title: 'Add New Customer', path: '/pharmacy/customers/add', icon: <FaPlusCircle /> },
            { title: 'View Customers', path: '/pharmacy/customers/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Invoices',
          children: [
            { title: 'Generate Invoice', path: '/pharmacy/invoices/generate', icon: <FaFileInvoiceDollar /> },
            { title: 'List of Sales Returns', path: '/pharmacy/invoices/sales-returns', icon: <FaExchangeAlt /> },
          ],
        },
        {
          title: 'Sales Return',
          children: [
            { title: 'Add Sales Return', path: '/pharmacy/sales-returns/add', icon: <FaPlusCircle /> },
            { title: 'View Sales Returns', path: '/pharmacy/sales-returns/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Purchases',
          children: [
            { title: 'Add Purchase / Stock', path: '/pharmacy/purchases/add', icon: <FaShoppingCart /> },
            { title: 'List of Purchase Bills', path: '/pharmacy/purchases/list', icon: <FaList /> },
            { title: 'Product / Stock Detail', path: '/pharmacy/purchases/detail', icon: <FaInfoCircle /> },
          ],
        },
        {
          title: 'Purchase Returns',
          children: [
            { title: 'Add Purchase Return', path: '/pharmacy/purchases/returns/add', icon: <FaExchangeAlt /> },
            { title: 'List of Purchase Returns', path: '/pharmacy/purchases/returns/list', icon: <FaList /> },
          ],
        },
        {
          title: 'Receipts',
          children: [
            { title: 'Add New Receipt', path: '/pharmacy/receipts/add', icon: <FaPlusCircle /> },
            { title: 'View Receipts', path: '/pharmacy/receipts/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Vouchers',
          children: [
            { title: 'Add New Voucher', path: '/pharmacy/vouchers/add', icon: <FaPlusCircle /> },
            { title: 'View Vouchers', path: '/pharmacy/vouchers/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Settings',
          children: [
            { title: 'Backup Data', path: '/pharmacy/settings/backup', icon: <FaDatabase /> },
            { title: 'Change Password', path: '/pharmacy/settings/password', icon: <FaKey /> },
            { title: 'Company Details', path: '/pharmacy/settings/company', icon: <FaBuilding /> },
          ],
        },
      ],
    },
    {
      title: 'Hospital',
      children: [
        { title: 'Dashboard', path: '/hospital/dashboard', icon: <FaChartLine /> },
        { title: 'Billing', path: '/hospital/billing', icon: <FaFileInvoiceDollar /> },
        {
          title: 'Patients',
          children: [
            { title: 'Add New Patient', path: '/hospital/patients/add', icon: <FaPlusCircle /> },
            { title: 'See Patients', path: '/hospital/patients/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Doctors',
          children: [
            { title: 'Add Doctor', path: '/hospital/doctors/add', icon: <FaPlusCircle /> },
            { title: 'View Doctors', path: '/hospital/doctors/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Account',
          children: [
            { title: 'Payment Overview', path: '/hospital/account/payments', icon: <FaMoneyBillWave /> },
            { title: 'Collection Overview', path: '/hospital/account/collections', icon: <FaReceipt /> },
          ],
        },
        {
          title: 'Reports',
          children: [
            { title: 'Daily Reports', path: '/hospital/reports/daily', icon: <FaCalendarAlt /> },
            { title: 'Service Reports', path: '/hospital/reports/service', icon: <FaTools /> },
            { title: 'Expense Reports', path: '/hospital/reports/expense', icon: <FaFileMedical /> },
          ],
        },
        {
          title: 'Data Entry',
          children: [
            { title: 'Add Medicine', path: '/hospital/data/medicine', icon: <FaPills /> },
            { title: 'Add Equipment', path: '/hospital/data/equipment', icon: <FaStethoscope /> },
          ],
        },
        {
          title: 'Appointments',
          children: [
            { title: "Today's Appointments", path: '/hospital/appointments/today', icon: <FaCalendarDay /> },
            { title: 'Upcoming Appointments', path: '/hospital/appointments/upcoming', icon: <FaCalendarPlus /> },
          ],
        },
        {
          title: 'Nursing',
          children: [
            { title: 'Admit Patients', path: '/hospital/nursing/admit', icon: <FaBed /> },
            { title: 'Monitor Vitals', path: '/hospital/nursing/vitals', icon: <FaHeartbeat /> },
          ],
        },
        {
          title: 'Lab',
          children: [
            { title: 'Lab Setup', path: '/hospital/lab/setup', icon: <FaCog /> },
            { title: 'Lab Invoices', path: '/hospital/lab/invoices', icon: <FaFileInvoiceDollar /> },
            { title: 'Lab Reports', path: '/hospital/lab/reports', icon: <FaFileMedical /> },
          ],
        },
      ],
    },
    {
      title: 'Retail',
      children: [
        { title: 'Dashboard', path: '/retail/dashboard', icon: <FaChartLine /> },
        {
          title: 'Items',
          children: [
            { title: 'Add New Item', path: '/retail/items/add', icon: <FaPlusCircle /> },
            { title: 'View Inventory', path: '/retail/items/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Item Kits',
          children: [
            { title: 'Create New Kit', path: '/retail/kits/add', icon: <FaPlusCircle /> },
            { title: 'View Kits', path: '/retail/kits/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Suppliers',
          children: [
            { title: 'Add Supplier', path: '/retail/suppliers/add', icon: <FaPlusCircle /> },
            { title: 'Supplier List', path: '/retail/suppliers/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Sales',
          children: [
            { title: 'New Sale', path: '/retail/sales/new', icon: <FaCashRegister /> },
            { title: 'Sales History', path: '/retail/sales/history', icon: <FaHistory /> },
          ],
        },
        {
          title: 'Receiving',
          children: [
            { title: 'Add New Stock', path: '/retail/receiving/add', icon: <FaPlusCircle /> },
            { title: 'Stock History', path: '/retail/receiving/history', icon: <FaHistory /> },
          ],
        },
        {
          title: 'Gift Cards',
          children: [
            { title: 'Add Gift Card', path: '/retail/gift-cards/add', icon: <FaPlusCircle /> },
            { title: 'View Gift Cards', path: '/retail/gift-cards/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Expenses',
          children: [
            { title: 'Add Expense', path: '/retail/expenses/add', icon: <FaPlusCircle /> },
            { title: 'Expense List', path: '/retail/expenses/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Reports',
          children: [
            { title: 'Sales Report', path: '/retail/reports/sales', icon: <FaChartLine /> },
            { title: 'Inventory Report', path: '/retail/reports/inventory', icon: <FaClipboardList /> },
            { title: 'Profit & Loss', path: '/retail/reports/profit-loss', icon: <FaBalanceScale /> },
          ],
        },
      ],
    },
    {
      title: 'Accounting',
      children: [
        { title: 'Dashboard', path: '/accounting/dashboard', icon: <FaChartLine /> },
        {
          title: 'Invoices',
          children: [
            { title: 'Add Invoice', path: '/accounting/invoices/add', icon: <FaPlusCircle /> },
            { title: 'View Invoices', path: '/accounting/invoices/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Purchases',
          children: [
            { title: 'Add Purchase', path: '/accounting/purchases/add', icon: <FaPlusCircle /> },
            { title: 'View Purchases', path: '/accounting/purchases/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Vouchers',
          children: [
            { title: 'Add Voucher', path: '/accounting/vouchers/add', icon: <FaPlusCircle /> },
            { title: 'View Vouchers', path: '/accounting/vouchers/view', icon: <FaList /> },
          ],
        },
        {
          title: 'Banking',
          children: [
            { title: 'Bank Accounts', path: '/accounting/banking/accounts', icon: <FaUniversity /> },
            { title: 'Transactions', path: '/accounting/banking/transactions', icon: <FaExchangeAlt /> },
          ],
        },
        {
          title: 'Double Entry Journal',
          children: [
            { title: 'Add Entry', path: '/accounting/journal/add', icon: <FaPlusCircle /> },
            { title: 'View Journal', path: '/accounting/journal/view', icon: <FaList /> },
          ],
        },
        {
          title: 'HR & Payroll',
          children: [
            { title: 'Employee List', path: '/accounting/hr/employees', icon: <FaUserTie /> },
            { title: 'Payroll History', path: '/accounting/hr/payroll', icon: <FaHistory /> },
          ],
        },
        {
          title: 'Reports',
          children: [
            { title: 'Profit & Loss', path: '/accounting/reports/profit-loss', icon: <FaBalanceScale /> },
            { title: 'Balance Sheet', path: '/accounting/reports/balance-sheet', icon: <FaBalanceScale /> },
            { title: 'Ledger Reports', path: '/accounting/reports/ledger', icon: <FaBook /> },
          ],
        },
        {
          title: 'Settings',
          children: [
            { title: 'Backup', path: '/accounting/settings/backup', icon: <FaDatabase /> },
            { title: 'Company Info', path: '/accounting/settings/company', icon: <FaBuilding /> },
          ],
        },
        {
          title: 'Apps',
          children: [
            { title: 'Plugin Marketplace', path: '/accounting/apps/plugins', icon: <FaPuzzlePiece /> },
            { title: 'Integrations', path: '/accounting/apps/integrations', icon: <FaProjectDiagram /> },
          ],
        },
      ],
    },
  ]
  
  export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-800 text-white h-screen overflow-y-auto p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-6">ERP System</h2>
        <nav className="space-y-2">
          {sidebarData.map((item, idx) => (
            <SidebarItem key={idx} item={item} />
          ))}
        </nav>
      </aside>
    )
  }