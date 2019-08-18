create table properties (
	prop_id serial primary KEY,
	address varchar(100),
	city varchar(100),
	state varchar(20),
	zip_code varchar(30),
	status varchar(30) default 'own',
	date_purchased date
	
);

create table prop_supplies(
	prop_id int,
	sup_id int
)

alter table prop_supplies add foreign key (prop_id) REFERENCES properties(prop_id);
alter table prop_supplies add foreign key (sup_id) REFERENCES supplies_expense(sup_id);


INSERT INTO properties(address, city, state, zip_code, date_purchased)
values('24 Ruth Place', 'Lynbrook', 'NY', '11564', '09/12/2018');
update properties set status='own';
select * from properties;
DROP TABLE properties;

create table tenant (
	tenant_id serial primary key,
	first_name varchar(50),
	last_name varchar(50),
	email varchar(50),
	phone_number varchar(20),
	status varchar(20) default 'active',
	movein_date date,
	prop_id int
);

alter table tenant add foreign key (prop_id) REFERENCES properties(prop_id);
DROP TABLE tenant;

create table rent (
	rent_id serial primary key,
	amount numeric(7,2),
	date_paid date,
	prop_id int,
	tenant_id int
	
)

alter table rent add foreign key (prop_id) REFERENCES properties(prop_id);
alter table rent add foreign key (tenant_id) REFERENCES tenant(tenant_id);
DROP TABLE rent;


create table supplies_expense (
	sup_id serial primary key,
	description varchar(100),
	amount numeric(7,2),
	store varchar(20),
	payment_receipt varchar(50),
	item_name varchar(100),
	date_purchased date,
	exp_id int
)

alter table supplies_expense add foreign key (exp_id) REFERENCES expenses(exp_id);
DROP TABLE supplies_expense;


create table expenses(
	exp_id serial primary key,
	type varchar(100)
)

insert into expenses values(1, 'Legal');
insert into expenses values(2, 'Supplies');
insert into expenses values(3, 'Financial');

DROP TABLE expenses;


create table financial_expenses(
	finex_id serial primary key,
	description varchar(100),
	amount numeric(12,2),
	payment_taken date,
	exp_id int
)
alter table financial_expenses add foreign key (exp_id) REFERENCES expenses(exp_id);
DROP TABLE financial_expenses;

create table legal_expenses(
	legexp_id serial primary key,
	description varchar(100),
	amount numeric(7,2),
	payment_receipt varchar(100),
	date_paid date,
	exp_id int
)
alter table legal_expenses add foreign key (exp_id) REFERENCES expenses(exp_id);
DROP TABLE legal_expenses;

create table financial_payments(
	fin_id serial primary key,
	description varchar(100),
	amount numeric(12,2),
	date_paid date,
	payment_receipt varchar(100),
	finex_id int
);
DROP TABLE financial_payments;
alter table financial_payments add foreign key (finex_id) REFERENCES financial_expenses(finex_id);

