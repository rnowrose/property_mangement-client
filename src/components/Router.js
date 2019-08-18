import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropService from './properties/PropTable'
import ExpenseReport from './reports/expense_report/ExpenseReports'
import RevenueReport from './reports/revenue_report/RevenueReport'

import TenantTable from './tenants/TenantTable'
import RentInsert from "./rent/RentInsert";
import PropInsert from './properties/PropInsert'
import TenantInsert from './tenants/TenantInsert'
import PropUpdate from "./properties/PropUpdate";
import TenantUpdate from "./tenants/TenantUpdate";
import SuppliesExpenseDisplay from "./expenses/supplies_expense/supplies_table/SuppliesExpenseDisplay";
import LegalExpense from "./expenses/legal_expense/legal_table/LegalDisplay";
import FinExDisplay from "./expenses/financial_expense/finex_tables/FinExDisplay";
import FinPayDisplay from "./expenses/financial_expense/finpay_tables/FinPayDisplay";
import SuppliesInsert from "./expenses/supplies_expense/supplies_modification/SuppliesInsert";
import LegalInsert from "./expenses/legal_expense/legal_modifications/LegalInsert";
import FinExInsert from "./expenses/financial_expense/finex_modification/FinExInsert";
import FinPayInsert from "./expenses/financial_expense/finpay_modification/FinPayInsert";
import FinExUpdate from "./expenses/financial_expense/finex_modification/FinExUpdate";
import FinPayUpdate from "./expenses/financial_expense/finpay_modification/FinPayUpdate";
import LegalUpdate from "./expenses/legal_expense/legal_modifications/LegalUpdate";
import SupplyUpdate from "./expenses/supplies_expense/supplies_modification/SuppliesUpdate";
import RevTenantReport from './reports/revenue_report/RevTenantReport'
import SupplyDisplay from './expenses/supplies_expense/supplies_table/SupplyDisplay'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={PropService} />
            <Route path="/expense_report" component={ExpenseReport} />
            <Route path="/tenants/:prop_id" component={TenantTable} />
            <Route path="/rents/:tenant_id/:prop_id" component={RentInsert} />
            <Route path="/add_property" component={PropInsert} />
            <Route path="/add_tenant/:prop_id/" component={TenantInsert} />
            <Route path="/update_property/:prop_id" component={PropUpdate} />
            <Route path="/update_tenant/:prop_id/:tenant_id" component={TenantUpdate} />
            <Route path="/supplies_expense" component={SuppliesExpenseDisplay} />
            <Route path="/legal_expense" component={LegalExpense} />
            <Route path="/finance_expense" component={FinExDisplay} />
            <Route path="/finance_payments/:finex_id" component={FinPayDisplay} />
            <Route path="/add_supplies" component={SuppliesInsert} />
            <Route path="/add_legal_expense" component={LegalInsert} />
            <Route path="/add_finance_expense" component={FinExInsert} />
            <Route path="/add_finance_payment/:finex_id" component={FinPayInsert} />
            <Route path="/update_finance_expense/:finex_id" component={FinExUpdate} />
            <Route path="/update_finance_payment/:finex_id/:fin_id" component={FinPayUpdate} />
            <Route path="/update_legal_expense/:legexp_id" component={LegalUpdate} />
            <Route path="/update_supply_expense/:sup_id" component={SupplyUpdate} />
            <Route path="/revenue_prop_report" component={RevenueReport} />
            <Route path="/revenue_tenant_report/:prop_id" component={RevTenantReport} />            
            <Route path="/supply_display/:sup_id" component={SupplyDisplay} />            


        </Switch>
    </Router>
);


export default Routes