import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  if (!data) throw { message: "Payment data is required. " };
  if (!data.amount) throw { message: "payment amount is required" };

  if (!data.purchaseOrderId)
    throw {
      message: "Payment Order isd is required.",
    };
  if (!data.purchaseOrderName)
    throw {
      message: "Purchase order name is required.",
    };

  const body = {
    return_url: config.khalti.returnUrl,
    amount: data.amount,
    website_url: config.appUrl,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer_name,
      email: data.customer_email,
      phone: data.customer_phone,
    },
  };
  console.log(config);
  const response = await axios.post(
    `${config.khalti.apiUrl}/epayment/initiate/`,
    body,
    {
      headers: {
        Authorization: `key ${config.khalti.apiKey}`,
      },
    }
  );
  return response.data;
};
export default { payViaKhalti };
