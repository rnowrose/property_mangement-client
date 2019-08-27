create table property_management.properties (
	prop_id serial primary KEY,
	address varchar(100),
	city varchar(100),
	state varchar(20),
	zip_code varchar(30),
	status varchar(30) default 'own',
	date_purchased timestamptz(6) default now()
	
);

INSERT INTO property_management.properties(address, city, state, zip_code)
values('24 Ruth Place', 'Lynbrook', 'NY', '11564');

create table property_management.tenant (
	tenant_id serial primary key,
	first_name varchar(50),
	last_name varchar(50),
	email varchar(50),
	phone_number varchar(20),
	status varchar(20) default 'active',
	movein_date timestamptz(6) default now(),
	prop_id int
);

create table property_management.rent (
	rent_id serial primary key,
	amount numeric(7,2),
	date_paid timestamptz(6) default now(),
	prop_id int,
	tenant_id int
	
);

create table property_management.expenses(
	exp_id serial primary key,
	type varchar(100)
);

insert into property_management.expenses values(1, 'Legal');
insert into property_management.expenses values(2, 'Supplies');
insert into property_management.expenses values(3, 'Financial');


create table property_management.supplies_expense (
	sup_id serial primary key,
	description varchar(100),
	amount numeric(7,2),
	store varchar(20),
	payment_receipt varchar(50),
	item_name varchar(100),
	date_purchased timestamptz(6) default now(),
	exp_id int
);
create table property_management.prop_supplies(
	prop_id int,
	sup_id int
);

create table property_management.financial_expenses(
	finex_id serial primary key,
	description varchar(100),
	amount numeric(12,2),
	payment_taken timestamptz(6) default now(),
	exp_id int
);

create table property_management.legal_expenses(
	legexp_id serial primary key,
	description varchar(100),
	amount numeric(7,2),
	payment_receipt varchar(100),
	date_paid timestamptz(6) default now(),
	exp_id int
);

create table property_management.financial_payments(
	fin_id serial primary key,
	description varchar(100),
	amount numeric(12,2),
	date_paid date,
	payment_receipt varchar(100),
	finex_id int
);

alter table property_management.prop_supplies add foreign key (prop_id) REFERENCES property_management.properties(prop_id);
alter table property_management.prop_supplies add foreign key (sup_id) REFERENCES property_management.supplies_expense(sup_id);
alter table property_management.tenant add foreign key (prop_id) REFERENCES property_management.properties(prop_id);
alter table property_management.rent add foreign key (prop_id) REFERENCES property_management.properties(prop_id);
alter table property_management.rent add foreign key (tenant_id) REFERENCES property_management.tenant(tenant_id);
alter table property_management.supplies_expense add foreign key (exp_id) REFERENCES property_management.expenses(exp_id);
alter table property_management.financial_expenses add foreign key (exp_id) REFERENCES property_management.expenses(exp_id);
alter table property_management.legal_expenses add foreign key (exp_id) REFERENCES property_management.expenses(exp_id);
alter table property_management.financial_payments add foreign key (finex_id) REFERENCES property_management.financial_expenses(finex_id);
