let cities = [
    "Toronto", "Ottawa", "North York", "York", "Brampton"
];

export function getCities() {
    return cities;
}

let languages = [
    "English", "French", "Spanish"
];


export function getLanguages() {
    return languages;
}

let cost = ["Free", "Paid", "Covered by OHIP", "Accepts Insurance"];

export function getCost() {
    return cost;
}


let services = [
    "Peer Support", "Counselling", "Crisis Support", "Individual Counselling"
];

export function getServices() {
    return services;
}


let population = [
    "Faith-based", "Black-led", "2SLGBTQ+", "Newcomers/Immigrants",
];

export function getPopulation() {
    return population;
}


// main data
let organizations = [
    {
        name: "Across Boundaries",
        cost: ["Free"],
        languages: ["English"],
        services: ["Peer Support"],
        population: ["2SLGBTQ+"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "51 Clarkson Avenue",
            postalCode: "M6E 2T5",
            province: "ON"
        },
        contact: {
            phone: "(416) 787- 3007",
            email: "info@acrossboundaries.ca",
            web: "https://www.acrossboundaries.ca/"
        }
    },
    {
        name: "Access Alliance",
        cost: ["Paid"],
        languages: ["French"],
        services: ["Counselling"],
        population: ["Newcomers/Immigrants"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "51 Clarkson Avenue",
            postalCode: "M6E 2T5",
            province: "ON"
        },
        contact: {
            phone: "416-324-8677",
            email: "languages@accessalliance.ca",
            web: "https://accessalliance.ca/"
        }
    },
    {
        name: "Regent Park Community Health Centre",
        cost: ["Paid", "Covered by OHIP"],
        languages: ["English", "French"],
        services: ["Crisis Support", "Individual Counselling", "Peer Support"],
        population: ["Newcomers/Immigrants"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "465 Dundas Street East",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(416) 364-2261",
            email: "info@regentparkchc.org",
            web: "http://www.regentparkchc.org/"
        }
    },
    {
        name: "Frontlines",
        cost: ["Accepts Insurance"],
        languages: ["English", "French", "Spanish"],
        services: ["Counselling", "Peer Support"],
        population: ["Black-led"],
        spotlight: true,
        address: {
            city: "York",
            streetAddress: "1844 Weston Road",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(416) 244-7017",
            email: "info@frontlines.to",
            web: "http://frontlines.to"
        }
    },
    {
        name: "Afri-Can Food Basket",
        cost: ["Free", "Paid"],
        languages: ["English"],
        services: ["Individual Counselling"],
        population: ["Black-led"],
        spotlight: true,
        address: {
            city: "North York",
            streetAddress: "4929 Jane Street",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "647-896-0641",
            email: "info@africanfoodbasket.ca",
            web: "https://africanfoodbasket.ca"
        }
    },
    {
        name: "Harriet Tubman Community Organization",
        cost: ["Covered by OHIP", "Accepts Insurance"],
        languages: ["French"],
        services: ["Peer Support"],
        population: ["Black-led"],
        spotlight: true,
        address: {
            city: "Toronto",
            streetAddress: "1761 Sheppard Avenue",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(416) 496-2042",
            email: "info@tubmancommunity.org",
            web: "https://www.tubmancommunity.org"
        }
    },
    {
        name: "Hope Christian Ministries",
        cost: ["Covered by OHIP", "Free"],
        languages: ["English", "French"],
        services: ["Counselling"],
        population: ["Black-led", "Faith-based"],
        spotlight: true,
        address: {
            city: "Brampton",
            streetAddress: "4316 Ebenezer Road",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(905) 487-4673",
            email: "info@hopecministries.com",
            web: "www.hopecministries.com"
        }
    },
    {
        name: "Caribbean African Canadian Social Services",
        cost: ["Accepts Insurance", "Paid"],
        languages: ["English", "French", "Spanish"],
        services: ["Counselling"],
        population: ["Black-led"],
        spotlight: true,
        address: {
            city: "North York",
            streetAddress: "99 Arrow Road",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(416) 740-1056",
            email: "Info@cafcan.org",
            web: "https://cafcan.org/"
        }
    },
    {
        name: "Bangladeshi-Canadian Community Services",
        cost: ["Free", "Paid"],
        languages: ["English"],
        services: ["Peer Support"],
        population: ["Newcomers/Immigrants"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "2899 Danforth Ave",
            postalCode: "M4C 1M3",
            province: "ON"
        },
        contact: {
            phone: "(416) 699-4484",
            email: "info@bangladeshi.ca",
            web: "https://www.bangladeshi.ca/"
        }
    },
    {
        name: "Skylark Children, Youth & Families",
        cost: ["Free"],
        languages: ["French"],
        services: ["Counselling"],
        population: ["2SLGBTQ+"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "40 Orchard View Blvd",
            postalCode: "M4R 1B9",
            province: "ON"
        },
        contact: {
            phone: "416-482-0081",
            email: "info@skylarkyouth.org",
            web: "skylarkyouth.org"
        }
    },
    {
        name: "The 519",
        cost: ["Paid"],
        languages: ["English", "French"],
        services: ["Crisis Support", "Individual Counselling", "Peer Support"],
        population: ["2SLGBTQ+", "Newcomers/Immigrants"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "519 Church St",
            postalCode: "M4Y 2C9",
            province: "ON"
        },
        contact: {
            phone: "(416) 392-6874",
            email: "Info@The519.org",
            web: "https://www.the519.org/"
        }
    },
    {
        name: "Yorktown Family Services",
        cost: ["Covered by OHIP"],
        languages: ["English", "French", "Spanish"],
        services: ["Counselling", "Peer Support"],
        population: ["2SLGBTQ+"],
        spotlight: false,
        address: {
            city: "Toronto",
            streetAddress: "2010 Eglinton Ave West",
            postalCode: "N/A",
            province: "ON"
        },
        contact: {
            phone: "(416) 394-2424",
            email: "info@yorktownfamilyservices.com",
            web: "www.yorktownfamilyservices.com"
        }
    },
    {
        name: "Our Lady of Victoria School",
        cost: ["Covered by OHIP", "Accepts Insurance", "Free", "Paid"],
        languages: ["English"],
        services: ["Crisis Support", "Individual Counselling", "Peer Support"],
        population: ["Faith-based"],
        spotlight: false,
        address: {
            city: "Ottawa",
            streetAddress: "1175 Soderlind St",
            postalCode: "K2C 3B3",
            province: "ON"
        },
        contact: {
            phone: "(613) 828-5594",
            email: "OurLady.Victory@ocsb.ca ",
            web: "http://olv.ocsb.ca/"
        }
    }

];

export function getOrganizations() {
    return organizations;
}
