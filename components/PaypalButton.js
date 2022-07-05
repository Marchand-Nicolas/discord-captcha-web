import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

function Button() {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps = {
        style: { layout: "vertical" },
        createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
            {
                amount: {
                value: "0.01"
                }
            }
            ]
        });
        },
        onApprove(data, actions) {
        /**
         * data: {
         *   orderID: string;
         *   payerID: string;
         *   paymentID: string | null;
         *   billingToken: string | null;
         *   facilitatorAccesstoken: string;
         * }
         */
        return actions.order.capture({}).then((details) => {
            alert(
            "Transaction completed by" +
                (details?.payer.name.given_name ?? "No details")
            );

            alert("Data details: " + JSON.stringify(data, null, 2));
        });
        }
    };
    return (
        <>
            {isPending ? <h2>Load Smart Payment Button...</h2> : null}
            <PayPalButtons {...paypalbuttonTransactionProps} />
        </>
    );
}

export default function PaypalButton() {
    return <PayPalScriptProvider options={{ "client-id": "AZ3TazDwK81igZjiDlESBedF7prgAcUPbtlZwRblh7oW9zX5Wy0k1gtn1wicE3jyN6d5cN2N6nnOTs2R" }}>
        <Button />
    </PayPalScriptProvider>
}
