// state
export const state = () =>({
    // payment options
    paymentPlans: [
        {name: 'Upon job completion'},
        {name: 'Per day'},
        {name: 'Per week'},
        {name: 'Per month'},
        {name: 'Per page'}
    ],
    // durations
    durations: [
        {name: '1 day - 1 week'},
        {name: '1 week - 2 weeks'},
        {name: '2 weeks - 1 month'},
        {name: '1 months - 3 months'},
        {name: '3 months - 6 months'},
        {name: '6 months - 1 year'},
        {name: 'More than 1 year'}
    ],
    // project types
    projectTypes: [
            
        {name: 'One Time Project ( for short term period)', value: 'One Time Project'},
        {name: 'Ongoing Project ( skilled professional engaged over time)', value: 'Ongoing Project'},
        {name: 'Long Term Complex Job', value: 'Long Term Project'}
    ],
    // categories
    categories: [
        {name: 'Account and Consultation', value: 'Accounting and Finance'},
        {name: 'Branding and Design', value: 'Branding and Design'},
        {name: 'Construction and Repairs', value: 'Construction and Repairs'},
        {name: 'Cleaning Services', value: 'Cleaning Services'},
        {name: 'Food Catering and Nutrition', value: 'Food, Catering and Nutrition'},
        {name: 'Writing Services', value: 'Writing Services'},
        {name: 'Web Mobile and Software', value: 'Web, Mobile and Software'},
        {name: 'IT & Networking', value: 'IT and Networking'},
        {name: 'Law and Legal Services', value: 'Law and Legal Services'},
        {name: 'Transport and Delivery Services', value: 'Transport and Delivery'},
        {name: 'Sales and Maketing Services', value: 'Sales and Marketing'}

    ],
    // currencies
    currencies: [
        {
            name: "Kenya Shilling",
            value: "KES"
        },
        {
            name: "Ugandan Shilling",
            value: "UGX"
        },
        {
            name: "Tanzania Shilling",
            value: "TZS"
        },
        {
            name: "Rwandan Franc",
            value: "RWF"
        },
        {
            name: "Burundi Franc",
            value: "BIF"
        },
        {
            name: "South Sudan Pound",
            value: "SSP"
        },
        {
            name: "Ethiopian Birr",
            value: "ETB"
        },
        {
            name: "Somali Shilling",
            value: "SOS"
        }
    ],
    // web specialties
    web: [
        {name: 'Ecommerce Development'},
        {name: 'Simple Website Development'},
        {name: 'Mobile App Development'},
        {name: 'Web App Development'},
        {name: 'Web App and Mobile App Development'},
        {name: 'Web App and Mobile App Design'},
        {name: 'Quality Assurance and Testing'}
    ],
    // writing specialties
    writing: [
        {name: 'Academic Writing and Research'},
        {name: 'Creative Writing'},
        {name: 'Editing and Proofreading'},
        {name: 'Copywriting'},
        {name: 'CV and cover letting writing'},
        {name: 'Business Proposals'}
    ],
    // construction specialties
    construction: [
        {name: 'Plumbing and Drainage Repairs'},
        {name: 'Electrical Fitting and Repairs'},
        {name: 'Roofing and Roof Repairs'},
        {name: 'House and Building Painting'}
    ],
    // account specialties
    accounting: [
        {name: 'Accounting Services'},
        {name: 'Accounting Consultation'},
        {name: 'Financial Analysi and Modelling'},
        {name: 'Tax Preparation and Return Filing'},
        {name: 'Business Analysis'},
        {name: 'HR Administration'}
    ],
    // cleaning specialties
    cleaning: [
        {name: 'Full House Cleaning'},
        {name: 'Carpet Washing'},
        {name: 'Clothes Washing'},
        {name: 'House, Carpet and Clothes washing'}
    ],
    // food specialties
    food: [
        {name: 'Baking Services'},
        {name: 'Birthday Cake Baking'},
        {name: 'Wedding Cake Baking'},
        {name: 'Event catering services'},
        {name: 'Nutrition Consultation'}
    ],
    // legal specialties
    legal: [
        {name: 'Contract Law Services'},
        {name: 'Corporate Law Services'},
        {name: 'Criminal Law Service'},
        {name: 'Advocate Services'}
    ],
    // design specialties
    design: [
        {name: 'Graphics and Design'},
        {name: 'Logo Design'},
        {name: 'Branding and Brand Identity'},
        {name: 'Banner and Bilboard Designer'},
        {name: 'Poster Design'},
        {name: 'Animation Illustrations'}
    ],
    // transaport specialties
    transport: [
        {name: 'Moving Services'},
        {name: 'Package/Goods Delivery'},
        {name: 'Vehicle and Driver for hire'}
    ],
    // sales specialties
    sales: [
        {name: 'Market and Customer Research'},
        {name: 'Social Media Marketer'},
        {name: 'Display Advertising Expertise'},
        {name: 'Public Relation Services'}
    ],

    // professional skills
    skills: [
        {name: 'Accounting Consultant'},
        {name: 'Brand and Logo Designer'},
        {name: "Poster and Billboard Designer"},
        {name: "Animation Illustrator"},
        {name: "Event Planner"},
        {name: "Music and Sound System Manager"},
        {name: "Music DJ"},
        {name: "Master of Ceremonies (MC)"},
        {name: "House Cleaner"},
        {name: "Clothes Cleaner"},
        {name: "Carpet Cleaner"},
        {name: "General Cleaner"},
        {name: "Plumber"},
        {name: "Electrician"},
        {name: "Welder"},
        {name: "Carpenter and Wood Worker"},
        {name: "Building Painter"},
        {name: "Stone Mason"},
        {name: "Photographer"},
        {name: "Videographer"},
        {name: "Video Editor"},
        {name: 'Construction and Repairs Expert'},
        {name: "Cake Baker"},
        {name: "Food and Nutritionist"},
        {name: "Outside Caterer"},
        {name: 'Writer'},
        {name: 'Web Mobile and Software'},
        {name: "Android Mobile App Developer"},
        {name: "Apple Mobile App Developer"},
        {name: "Web Application Developer"},
        {name: "Website Developer"},
        {name: "IT Specialist"},
        {name: 'IT & Networking'},
        {name: 'Law and Legal Services'},
        {name: "Lawyer"},
        {name: "Heavy Goods Transporter"},
        {name: "Light Goods Transporter"},
        {name: "Mover"},
        {name: "Package Deliver Person"},
        {name: "Other"}

    ],
});