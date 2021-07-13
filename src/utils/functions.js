import { getOrganizations } from "./data";

/**
 *
 * @param {} searchCriteria
 * sample searchCriteria goes below
 * {
 *    "city": "toronto",
 *    "cost": "low",
 *    "serviceOffered": ["black-led", "free"],
 *    "populationServed": ["insurance", "no-insurance"],
 *    "languageProvided": "English"
 * }
 */
export function searchOrganizations(searchCriteria) {
    return getOrganizations()
    .filter( org =>
        contains(searchCriteria.city, org.address.city) &&
        anyMatch(org.cost, searchCriteria.cost) &&
        anyMatch(org.services, searchCriteria.serviceOffered) &&
        anyMatch(org.population, searchCriteria.populationServed) &&
        anyMatch(org.languages, searchCriteria.languageProvided)
    )
    .sort( (a, b) => { return (a.spotlight === b.spotlight) ? 0 : a.spotlight ? -1 : 1});
}

function isMatch(val1, val2) {
    return isUnDefined(val1) || isUnDefined(val2) || val1.toUpperCase() === val2.toUpperCase();
}

function contains(arr, val) {
    return isUnDefined(val) || isUnDefined(arr) || arr.find( elem => elem.toUpperCase() === val.toUpperCase());
}

function anyMatch(arr1, arr2) {
    if (isUnDefined(arr2)) return true;
    for (const val2 of arr2) {
        if (arr1.find(val1 => isMatch(val1, val2))) {
            return true;
        }
    }
    return false;
}

function isUnDefined(obj) {
    return typeof obj === 'undefined';
}