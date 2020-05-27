import UTM from "./../src/index";

describe("UTM.parse()", () => {
  beforeEach(() => {
    delete window.location;
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
      utm_name: "name"
    };

    expect(UTM.parse()).toStrictEqual(expected);
  });

  test("Return empty object if URL not contain utm param", () => {
    window.location = {
      toString: () => "http://example.com"
    };
    const expected = {};

    expect(UTM.parse()).toStrictEqual(expected);
  });
});

describe("UTM.save()", () => {
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
