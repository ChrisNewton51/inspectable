export let AndroidPurchaseState;

(function (AndroidPurchaseState) {
  AndroidPurchaseState[AndroidPurchaseState["purchased"] = 0] = "purchased";
  AndroidPurchaseState[AndroidPurchaseState["canceled"] = 1] = "canceled";
  AndroidPurchaseState[AndroidPurchaseState["pending"] = 2] = "pending";
})(AndroidPurchaseState || (AndroidPurchaseState = {}));

export let AndroidPurchaseType;

(function (AndroidPurchaseType) {
  AndroidPurchaseType[AndroidPurchaseType["test"] = 0] = "test";
  AndroidPurchaseType[AndroidPurchaseType["promo"] = 1] = "promo";
  AndroidPurchaseType[AndroidPurchaseType["rewarded"] = 2] = "rewarded";
})(AndroidPurchaseType || (AndroidPurchaseType = {}));

export let AndroidConsumptionState;

(function (AndroidConsumptionState) {
  AndroidConsumptionState[AndroidConsumptionState["yet"] = 0] = "yet";
  AndroidConsumptionState[AndroidConsumptionState["consumed"] = 1] = "consumed";
})(AndroidConsumptionState || (AndroidConsumptionState = {}));

export let AndroidAcknowledgementState;
/**
 * Get a list of products (consumable and non-consumable items, but not subscriptions)
 * @param {number} startTimeMillis The time the product was purchased, in milliseconds since the epoch (Jan 1, 1970).
 * @param {number} expiryTimeMillis The time the product expires, in milliseconds since the epoch (Jan 1, 1970).
 * @param {boolean} autoRenewing Check if it is a renewable product.
 * @param {string} priceCurrencyCode The price currency.
 * @param {number} priceAmountMicros Price amount int micros.
 * @param {string} countryCode Country code.
 * @param {string} developerPayload Developer payload.
 * @param {string} orderId Order id.
 * @param {AndroidPurchaseType} purchaseType Purchase type.
 * @param {AndroidAcknowledgementState} acknowledgementState Check if product is acknowledged.
 * @param {string} kind
 */

(function (AndroidAcknowledgementState) {
  AndroidAcknowledgementState[AndroidAcknowledgementState["yet"] = 0] = "yet";
  AndroidAcknowledgementState[AndroidAcknowledgementState["acknowledged"] = 1] = "acknowledged";
})(AndroidAcknowledgementState || (AndroidAcknowledgementState = {}));
//# sourceMappingURL=android.js.map