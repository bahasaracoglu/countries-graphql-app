import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import RowComponent from "./RowComponent";
import { CountriesInterface } from "../constants/CountriesInterface";
import { BounceLoader } from "react-spinners";
import { GET_LOCATIONS } from "../constants/Query";
import { colors } from "../constants/ColorsEnum";

const DisplayLocations: React.FC = () => {
  const { loading, error, data } = useQuery<{
    countries: CountriesInterface[];
  }>(GET_LOCATIONS);

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupQuery, setGroupQuery] = useState<string>("");

  console.log("selectedRow", selectedRow);
  // console.log("searchQuery", searchQuery);
  // console.log("groupQuery", groupQuery);

  // console.log(currentColor);

  useEffect(() => {
    pickRandomColor();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const splitSearch = value.split("search:");
    const splitGroup = value.split("group:");
    setSearchQuery(value);

    console.log("splitSearch", splitSearch);

    if (splitSearch[1]?.includes("group:")) {
      console.log("heree");
      setSearchQuery(splitSearch[1].split("group:")[0].trim());
    } else {
      setSearchQuery(splitSearch.length > 1 ? splitSearch[1] : splitSearch[0]);
    }

    setGroupQuery(
      splitGroup.length > 1 ? splitGroup[1].trim().toLowerCase() : ""
    );

    // console.log("splitGroup", splitGroup);
  };

  const filteredCountries = data?.countries.filter((country) =>
    Object.values(country).some((field) => {
      if (typeof field === "string") {
        return field.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (Array.isArray(field)) {
        // Eğer field bir dizi ise, dizi elemanları üzerinde kontrol yap
        return field.some(
          (lang) =>
            lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lang.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return false;
    })
  );

  const handleClick = (code: string) => {
    console.log("Clicked Code:", code);
    console.log("Previous Selected Row:", selectedRow);
    pickRandomColor();
    setSelectedRow(code);
  };

  const pickRandomColor = () => {
    const colorKeys = Object.keys(colors) as (keyof typeof colors)[];
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    if (currentColor !== colors[randomKey]) {
      setCurrentColor(colors[randomKey]);
    } else {
      pickRandomColor();
    }
  };

  const groupCountriesBy = (
    groupKey: keyof CountriesInterface,
    countries: CountriesInterface[]
  ) => {
    const groupedCountries: { [key: string]: CountriesInterface[] } = {};

    countries.forEach((country) => {
      let groupValue: string;

      if (groupKey === "continent" && typeof country[groupKey] === "object") {
        groupValue = (country[groupKey] as any)?.name;
      } else if (groupKey === "languages" && Array.isArray(country[groupKey])) {
        // Eğer languages özelliği bir dizi ise, dil isimlerini bir diziye topla
        const languageNames = (country[groupKey] as any)?.map(
          (lang: any) => lang.name
        );
        // Dil isimlerini alfabetik sıraya göre sırala
        languageNames.sort((a: string, b: string) => a.localeCompare(b));
        // Sıralanmış dil isimlerini virgülle birleştirerek groupValue'e ata
        groupValue = languageNames.join(", ");
      } else {
        groupValue = country[groupKey] as string;
      }

      if (!groupedCountries[groupValue]) {
        groupedCountries[groupValue] = [];
      }
      groupedCountries[groupValue].push(country);
    });

    return groupedCountries;
  };
  useEffect(() => {
    if (searchQuery || groupQuery) {
      // Eğer searchQuery veya groupQuery değerleri varsa filtreleme yapılmış demektir
      if (filteredCountries && filteredCountries.length > 0) {
        const tenthItemsCode =
          filteredCountries.length >= 10
            ? filteredCountries[9].code
            : filteredCountries[filteredCountries.length - 1].code; // Select the last item if there are fewer than 10 items
        setSelectedRow(tenthItemsCode);
      }
    }
  }, [filteredCountries, searchQuery, groupQuery]);
  useEffect(() => {
    if (!searchQuery && !groupQuery) {
      // Eğer ne searchQuery ne de groupQuery değerleri varsa (filtreleme yapılmamışsa)
      if (data?.countries && data.countries.length > 0) {
        const tenthItemsCode =
          data.countries.length >= 10
            ? data.countries[9].code
            : data.countries[data.countries.length - 1].code; // Select the last item if there are fewer than 10 items
        setSelectedRow(tenthItemsCode);
      }
    }
  }, [data, searchQuery, groupQuery]);

  const groupedCountries = groupQuery
    ? groupCountriesBy(
        groupQuery as keyof CountriesInterface,
        filteredCountries || []
      )
    : null;
  useEffect(() => {
    if (groupQuery && groupedCountries) {
      console.log("çalıştı");

      const groupedCountriesArray = Object.values(groupedCountries).flat();
      const tenthItemsCode =
        groupedCountriesArray.length >= 10
          ? groupedCountriesArray[9].code
          : groupedCountriesArray[groupedCountriesArray.length - 1].code;
      setSelectedRow(tenthItemsCode);
    }
  }, [groupQuery, groupedCountries]);

  if (loading) {
    // Loading durumu sırasında
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <BounceLoader color="#FF3131" size={80} />
      </div>
    );
  }
  if (error) return <p>Error : {error.message}</p>;

  console.log("groupedCountries", groupedCountries);

  return (
    <div className="h-[90vh] bg-white p-4 md:mx-auto rounded-lg shadow-xl  md:w-[85%] lg:w-[80%] ">
      <div className="flex justify-center p-4 ">
        <SearchComponent onChange={handleSearchChange} />
      </div>
      <div className="p-4 m-auto max-h-[85%] overflow-auto">
        <div className="table-container  ">
          <table className=" border-separate border border-slate-400 w-full ">
            <thead className=" top-0 bg-slate-50">
              <tr className="bg-slate-50">
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Name
                </th>
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Code
                </th>
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Native
                </th>
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Capital
                </th>
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Emoji
                </th>
                <th className=" w-9 border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Currency
                </th>
                <th className=" border border-slate-300  font-semibold p-3 text-slate-900  text-left">
                  Continent
                </th>
                <th className=" border border-slate-300 p-0 flex flex-col w-full h-16 justify-center font-semibold text-slate-900  text-center  ">
                  <span className="">Languages</span>
                  <div className="flex justify-evenly ">
                    <span>Name</span>
                    <span>Code</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className=" max-h-[500px] overflow-y-auto ">
              {groupQuery
                ? Object.entries(groupedCountries || {}).map(
                    ([groupName, groupCountries]) => (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-100">
                          <th
                            colSpan={8}
                            className="p-4 text-slate-900 text-left"
                          >
                            {`${
                              groupQuery[0].toUpperCase() + groupQuery.slice(1)
                            }: ${groupName}`}
                          </th>
                        </tr>
                        {groupCountries.map((country) => (
                          <RowComponent
                            key={country.code}
                            country={country}
                            handleClick={handleClick}
                            selectedRow={selectedRow}
                            currentColor={currentColor}
                          />
                        ))}
                      </React.Fragment>
                    )
                  )
                : // Gruplama yapılmamışsa, direkt ülkeleri listeleyin
                  filteredCountries?.map((country) => (
                    <RowComponent
                      key={country.code}
                      country={country}
                      handleClick={handleClick}
                      selectedRow={selectedRow}
                      currentColor={currentColor}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayLocations;
