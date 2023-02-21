import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Store} from '../stores/store.js'

export const Order = sequelize.define("orders", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
    },
    sale_date:{
        type: DataTypes.DATE,
    },
    item_name:{
        type: DataTypes.STRING,
    },
    buyer:{
        type: DataTypes.STRING,
    },
    quantity:{
        type: DataTypes.INTEGER,
    },
    price:{
        type: DataTypes.FLOAT
    },
    coupon_code:{
        type: DataTypes.STRING,
    },
    coupon_details:{
        type: DataTypes.STRING,
    },
    discount_amount:{
        type: DataTypes.FLOAT
    },
    shipping_discount:{
        type: DataTypes.FLOAT
    },
    order_shipping:{
        type: DataTypes.FLOAT
    },
    order_sales_tax:{
        type: DataTypes.FLOAT
    },
    item_total:{
        type: DataTypes.FLOAT
    },
    currency:{
        type: DataTypes.STRING,
    },
    transaction_id:{
        type: DataTypes.STRING,
    },
    listing_id:{
        type: DataTypes.STRING,
    },
    date_paid:{
        type: DataTypes.DATE,
    },
    date_shipped:{
        type: DataTypes.DATE,
    },
    ship_same:{
        type: DataTypes.STRING,
    },
    ship_address1:{
        type: DataTypes.STRING,
    },
    ship_address2:{
        type: DataTypes.STRING,
    },
    ship_city:{
        type: DataTypes.STRING,
    },
    ship_state:{
        type: DataTypes.STRING,
    },
    ship_zipcode:{
        type: DataTypes.STRING,
    },
    ship_country:{
        type: DataTypes.STRING,
    },
    order_id:{
        type: DataTypes.STRING,
    },
    variations:{
        type: DataTypes.STRING,
    }, 
    order_type:{
        type: DataTypes.STRING,
    }, 
    listings_type:{
        type: DataTypes.STRING,
    }, 
    payment_type:{
        type: DataTypes.STRING,
    }, 
    inPerson_discount:{
        type: DataTypes.STRING,
    },
    inPerson_location:{
        type: DataTypes.STRING,
    },
    vat_paid_by_buyer:{
        type: DataTypes.FLOAT,
    },
    sku:{
        type: DataTypes.STRING,
    },


    
},{
    timestamps: true,
});


Order.belongsTo(Store,{
    foreignKey: 'id_store',
    sourceKey:'id',
}) 

