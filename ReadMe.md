# Assignment 3

## Set up the backend

- Install node.js
- Install MySQL
- Connect MySQL to the nodejs

### Inside the Node.js environment

- Install express
- Install mysql
- install body-parser

#### API Implementation

##### sendSMS(phone, message_body)

##### getSMS()

##### smsSent(msg_id)

### MySQL Database 

```SQL
CREATE TABLE `smsQ`.`sms_table` (
  `id` INT NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `body` MEDIUMTEXT NULL,
  `ts` TIMESTAMP(1) NULL,
  `sent` BOOLEAN NULL,
  PRIMARY KEY (`id`));
```

