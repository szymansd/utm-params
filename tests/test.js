/**
 * @jest-environment jsdom
 */

import UTM from "./../src/index.js";

const EMPTY_UTM_SET = {
    "gclid": null,
    "initial_utm_campaign": null,
    "initial_utm_content": null,
    "initial_utm_medium": null,
    "initial_utm_name": null,
    "initial_utm_source": null,
    "initial_utm_term": null,
    "utm_campaign": null,
    "utm_content": null,
    "utm_medium": null,
    "utm_name": null,
    "utm_source": null,
    "utm_term": null,
};

describe("UTM.parse()", () => {
    beforeEach(() => {
        delete window.location;
        localStorage.clear();
        jest.clearAllMocks();
        localStorage.setItem.mockClear();
    });

    test("Get proper params based on real URL", () => {
        window.location = {
            toString: () =>
                "http://example.com?utm_source=example&utm_content=content&utm_medium=medium&utm_campaign=campaign&utm_name=name&utm_tem=term"
        };
        const expected = {
            utm_source: "example",
            utm_medium: "medium",
            utm_campaign: "campaign",
            utm_content: "content",
            utm_name: "name",
            gclid: null,
            initial_utm_campaign: null,
            initial_utm_content: null,
            initial_utm_medium: null,
            initial_utm_name: null,
            initial_utm_source: null,
            initial_utm_term: null,
            utm_term: null,
        };

        expect(UTM.parse()).toStrictEqual(expected);
    });

    test("Return empty object if URL not contain utm param", () => {
        window.location = {
            toString: () => "http://example.com"
        };


        expect(UTM.parse()).toStrictEqual(EMPTY_UTM_SET);
    });
});

describe("UTM.save()", () => {
    beforeEach(() => {
        delete window.location;
        localStorage.clear();
        jest.clearAllMocks();
        localStorage.setItem.mockClear();
    });

    test("Save proper params to localStorage", () => {
        const params = {
            utm_source: "example",
            utm_medium: "medium",
            utm_campaign: "campaign",
            utm_content: "content",
            utm_name: "name"
        };

        const paramsWithInitialValues = {
            utm_source: "example",
            utm_medium: "medium",
            utm_campaign: "campaign",
            utm_content: "content",
            utm_name: "name",
            initial_utm_source: "example",
            initial_utm_medium: "medium",
            initial_utm_campaign: "campaign",
            initial_utm_content: "content",
            initial_utm_name: "name"
        };
        expect(UTM.save(params)).toBe(true);

        expect(localStorage.setItem).toHaveBeenLastCalledWith(
            "utmSavedParams",
            JSON.stringify(paramsWithInitialValues)
        );
    });
});

describe("UTM.get()", () => {
    beforeEach(() => {
        delete window.location;
        localStorage.clear();
        jest.clearAllMocks();
        localStorage.setItem.mockClear();
    });

    test("Should change old utm parameters to initial if non new are provided", () => {
        window.location = {
            toString: () =>
                "http://example.com?utm_source=example&utm_content=content&utm_medium=medium&utm_campaign=campaign&utm_name=name&utm_tem=term"
        };
        const expected = {
            utm_source: "example",
            utm_medium: "medium",
            utm_campaign: "campaign",
            utm_content: "content",
            utm_name: "name",
            gclid: null,
            initial_utm_campaign: null,
            initial_utm_content: null,
            initial_utm_medium: null,
            initial_utm_name: null,
            initial_utm_source: null,
            initial_utm_term: null,
            utm_term: null,

        };
        UTM.save(UTM.parse());
        expect(UTM.parse()).toStrictEqual(expected);

        window.location = {
            toString: () => "https://example.com"
        };
        const params = UTM.parse();

        const emptyParamsWithInital = {};
        Object.assign(emptyParamsWithInital, EMPTY_UTM_SET);
        Object.assign(emptyParamsWithInital, {
            initial_utm_source:"example",
            initial_utm_medium:"medium",
            initial_utm_campaign:"campaign",
            initial_utm_content:"content",
            initial_utm_name:"name"
        });
        expect(UTM.parse()).toStrictEqual(EMPTY_UTM_SET);
        UTM.save(params);

        expect(UTM.get()).toStrictEqual({
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
            utm_content: null,
            utm_name: null,
            initial_utm_campaign: "campaign",
            initial_utm_content: "content",
            initial_utm_medium: "medium",
            initial_utm_name: "name",
            initial_utm_source: "example",
            gclid: null,
            initial_gclid: null,
            utm_term: null,
            initial_utm_term: null,
        });

    });
});
