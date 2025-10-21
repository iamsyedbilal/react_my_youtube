import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../constants/constant";
import { cachedResults } from "../features/searchSlice/searchSlice";
import { toggleTheme } from "../features/themeSlice/themeSlice";
import { BsSun, BsMoonStars } from "react-icons/bs";

function Head() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const searchCache = useSelector((store) => store.search);
  const darkMode = useSelector((store) => store.theme.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length === 0) {
        setSuggestion([]);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchQuerySuggestions();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  async function getSearchQuerySuggestions() {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API(searchQuery));
      const response = await data.json();

      setSuggestion(response[1]);
      dispatch(cachedResults({ [searchQuery]: response[1] }));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/result?q=${searchQuery}`);
  }

  return (
    <div className="sticky top-0 z-50 grid grid-cols-12 items-center shadow-md py-2 px-6 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 col-span-2 ml-2">
        <RxHamburgerMenu className="cursor-pointer" size={22} />
        <Link to="/">
          <img
            className="h-12 md:h-16 cursor-pointer transition-transform duration-300 hover:scale-105"
            alt="youtube-logo"
            src={
              darkMode
                ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABIFBMVEUAAAABAQH+AAL////8/Pz7AQKioqLt7e3U1NQEBASnp6exsbGIiIitra29vb1dXV0pKSmBgYEaGhpYWFj29vZNTU3a2trNzc2bm5tpaWkAAAXT09P73NsOAAAABAATExPj4+NFRUUYAAB0dHQxMTE5OTnfMzT2BgxcXFx7e3voAACNjY3o6Oj//f64uLgGAQmxDxK8DhWCCAkmAADkDhMzAAAqKir/8OnfAADSKylSBgcTAAAvBgBACAZcCgpqCwyLCAifDROHCQrGCw7YDxS7DR7iFReMEBgeAABXCwrqXl74yMHaY2DNAADfLj343OTTT0X0qanNNzvunZf5//PriIv+ysnmeIX87O/vtrbYX0/denL89erKMzD+0tLpV16RMuRSAAAQbUlEQVR4nO1biV/jNhaWE4cgjkDAuUzjhCMbCEc4QoeB4RqyzLTTY9ud7ba7bff//y9W7z3JR+KTwBj352+ORLElS9879PQkM8aYxgia5yMvThe1HLHBciTDq9DwjBRz5HgJpO00s4S0ZZUtpC2tLCEnKwFyshIgJysB0naZ2ULa0soS0pZVtpC2tLKEtGWVLaQtrSwhbVllC2lLK0tIW1aZwytJQmagmLZqZwksRwKkLa0sIScrAXKyEiBtL5A5vIpZOSPF19KPTBRzxEbaTjNLSFtW2ULa0soS0pZVtpC2tLIE5Evx5vnIi37FHLGRtmpnCWnLKltIW1pZQk5WAuRkJQBaorJIz0denC6mLa0sIScrAViOBEhbWllC2rLKFtKWVpaQtqyyhbSllSV8AUm87CO+KFIWVqYQm1G/H2Pe+NdBHDZnk8RTa78+RA2Fqf9MS/zHteFwaMIXzum694O+c7ou/nFRk4v7Ta6ZWvZ5iySLaaYJ9GjmUHyKb5a3sosCvM0CQB1VTX7+FRAtbA5/xF/T5AwUyIK/aF9txNWWxBWU6AoyKlgS91tQlXtU74viObU5hlMDkwJluTp7d315c3t6end3DziWOFFQP4hrd+9PT29uLq/Pz7bAEE0yXsmkmzmpmAwTRrFmB79uowVw/9/VVxZvuNHPDoPgyrKuLt8fnzyMx+PH0Wg0GAz6EyhNlAeD0ehiNB4/nBzfn96cCRseOg2Kv57HCr2DnvCY+geu0H8kPtXVRbKKGdUsmkzRt63bv49H/RKhMIWSD+TPQNvF6OT2ymyb2qTm8Mmdy3ia5U+Vb3Xxy34d0YSnvWBYQ1wKp3N+N0amCiUXMUEsTVBWgpsGj/fn1nDIydJWWyuA3TUVlX29Qj904mz7iip8xQ+7PmwIYheKiEVB1rOwFZR1Bk9umdr58ahU8DAAPE0rmI/GEZ/i6+D+3BySlbCeTv1fUY9qUnlekhWRC9dYxyj6AapP152ji8vM8Vkvsn2PDsJsn5IFxmAnCKL+4wdmWtzC/jao/010I1jWdSzHET2QVfbjyuhMrx+8ZEW2HePhIa5U4212fTKYkaxSf1Dqj69NiFbhkc0i6lZFCnutK8gS2I3oje1mw8iacslezZoN4TTyYZt9GJX6hRnIkrbbPzWFYqHw16n/3TUia90QiqUX62uMx/NZCTRL+1KaRXH4x+N+qTCLZhFXpdLJlnBaEM0z1sX+6zWGqrYEiqbHl73js3T7P/jssOnQ4fk1K9CVihCcn49Ls5GFdIl/D+cQ0JsQZC3i4PQqOakjLOgtV3Qa1isRcrQIDeKqIouu2dDfwT/L+axgsoacX/Zn8u0OWaNvmNKsbdKlRdSsDulZeScuWTYly9TMgiyCFYfOhi9LFh/y9k1/RqqQLvF3cKu1BVnQ8k65iF4Ko9IaGZVy9/R8mxJNLdddZME1+LNIPCwwFREoW3GSQxNm6B2n3RB+zBo6cEsEDiF6JSJ06ZAK4eoHZPXfCw8ve0zBg9GDbu7RaKrYaVgKyfXipAOSVNg/MxdZ9m8qc8TsmxyyMGPEmX0PgdOi1HFKTwREWVd3YZpVGmBcH7AMmiDrTo2fsX0aQQs6ukzuuUdkuZ9Oww/snEOWOz5zL6cnNMvWAZtPz+NiRHnh/t/cug8kSxD0+O1YrKmD1owTZN23bflJ05sTA+B1/FpHiYv+bLaq+0vbNRjGxHg8kvdoFpu8YjPnJovx9erS3qZSLY5y6LX29va2a2tMmn8oQi5jflREDsFkFX7489N33w8866DAm/vHW0qmjNVxHtuA3pbxaxNW7Gyt2SUaje7c12SMbBvWwfP1xiqMfo6WxYsYkrnIYjW6UK8BWdv0vQEUOGRVuxBlGI0eA3uE/1h1nh6nl482fQKPKUZYoEsDEZhnJ4EcCHp++FF/8+kfF/2Ccl0h6J+ccZUmwSHoxbIgoEVTWg3cyUpZhU0iTD1oUWeqNNoyklWhwgb20k2WDHTFghMjN6riIauiwrLuDk0bbGcef6J/hgxknn4+i2vvHsLI+ttXuv75zU8/X2A6JoysEgRajohWcIEjKBKDgc6WoSs1XUWYuFY01jGJ45Cl2WTNY/9DyNInyVpYlq2KS0fouNgqLrNwqYWMtRh/uhkCWdb5OGz8gqzDQ0HXP/+4IN8VdvP42pmkOgfY833GNnAsi6L/nXrRAVytYxoiBllalGYJPTVUq0IKm0jWInGlHqh3+Qw+C3EdTJZw26BZui7o+upfby9CPZe4MLrUTKXKImyHflbYGq3zwOSqJGRjYXtZjmCPsUCyAs2Q+ZEl0J1bLutkcktQo2egRpWbK0tlVDDoRARZYfMk49b1YzBZBSILuvL591/+/XZQCF4XIVnctJ3ANukOmB7IWgyLN0jQc0yGE3qxEeSzfDRLDyML2uoI/2joUkYMwxfoulButkccLoeQoSgJgWlejsK8tiALngimqP/66btxv0AB6nQdqVkqAGQ7ZBZrVckKZ5soX7ARznpF+r4Wz2dFkyWry0zaPAQNDWWSHFYUSl+frlmCrcuLCLKEVpElfv78u5gYB4OBr3YhWcx0Wt9AD1JbRLL2xUi2aSBdXA/r5IxXPGaImqX7kMWiyTpy52sORFudMjZ1APJgdef+p2qWuBiHLFSRQ4Dx5refL/wzhSVaSdv7rTKIr26gQ9kUPW7SdNWAiIXRRIUkxpwNI8haZrCHpNrqifgOrbDYRb8wT1q283TNYrHIglEd0jyDE+NPb33ZIrLEOlo9kZxVBSOrrmvoFez9BiqcGGIsnxWLLKa0F01dzQh1bIkS20Jm0QhJhsQmCxXEgCji7SBYsyCdBdv50DypPvqmBRcPR6r3krnnIwvDO3rmOgTDrpZkZmw9lI1wsmL6LHjQIQaZxpuf/rgQ8ZbPndLBm2Td0PEFCt2hlyt2h4ksTZHVeK7ZUJFVtMna82oWIpKsUCMdRs6Gn1VcbOiHv/72rYhNQ0IHpqlDImIKapE0Re3uqrK8cLJm81mAdXwekrXkS9bTfRYkgS9HgUzJ5Q7pln5o/PKf7/uFAK5ssmRSAPZaD1RETZY3T+TRtCXJqj+zZtXkXbvyHr1Y7/V6m70Nlxk+DeBetJCg1CbrUFD1+6f/vr2gYw9BNz8SWXb7cuCQ9+P2jOT1WUFkbUxoFouxkAZMkgURvGEYZV1pViQlwRAzfchyp4TLnUPULLHcGUQtd8TaUDNdGl2VilXGhKmLLC2ALC0w6xCLLG2aLF1FPoqsGUIHM2IhXfjhR3DrMAVeRORLiSyuNAvTfIZyTBNkoc9CzE9rlm9QmpAs22fpahk9u2aZpqWdh6VoBFmfxbLwtz8unGMNAYRhisbynMySOVKxGORsWrNQ3vMsVtaBMZfPiiBrwsHrLkRrVvAlC8g6i8hniTXOz5Ce6buO1QTcfPLRss2Q0SIDR9gkbZsmi3xT0rVhtGZ5Z0Ou0OlE5WhCNYtb/Owk0LSArD8/fQfrG6SqFJJ0gEvHW85xVOasyOBACMAJHTTbDGOGDpH5LEXWijTDXSkDXbYkEZVYDjNQIOvjcZhmjf6HGxZBd3hvPr6yd3do88EhS3Msz0NWJX7oEIuslkwir6scEcZZ9qZInLMWgWQJS7y6D80VD0rxuIINi3th1cxyicgmC3+pEFmwwkGyYCyLLrK+TpJW9iUL14YyDSSCeUWW4KrXWq/1dlYDzxTalARboWZZ5jB0k7UAXMUgCzL0/Ts4ReNouocspqkjeg0UcJ1i+2ZiM9wNibM0uIAZ/x0xF9PvXSRxSaxAjHJ9dYbQweRiqr/tlwKP+cXYAlMnHUqFwa3Fh6b7iQ5ZsMMnN15J1AaRteciawf2+WToMBmUxtWsBareFRdWaRPsoMNkeqhYNFafrlmwk2da34zCnHZssgqlwY1pDk23mFxkwT4Y5sH1g1U4WUwpE9ym3qa7MKXpIkvz16xtqUA+ZIlmN2jx3nBEBUcI4CAPPK8cR7OC9g3xTOn1WE52gVyEcyU5LZTg6N/QlFt2Ew4ehrtTpmiH9i4AOtgIa+k2DZh61n3NsGc45rZa1yfIws1CyMFTYY5qY2wFmyJrXaXUwWxEZB3wknV2HE5WDBBZx1uKrCnNYvKcFpLVXVltlWlQC6AOmwZ+Lx60avuGjLmnyWLyNKCxV6t25V3uDQu93NxuqjUgHAVju6jI+kGrV6vEPE4XbqGMD9npIHz7NBZbhUL/1E4qs8nQAXRN2KFBstbLnkWjZzvRoEB2HkXtPkUjV5O6ugu+uc1Qd66iy4Ilg4zb5Q6+YdSiXFa4zxKhFr8c0/apQ1hi5kC1xpfwGo/mr1lUXkavrpI+uAULxDZdNOzTNDAVOmgqbsK6y61JsvRF1zoQtw052zVcO9Kox+F6FX0wRISlH0b9knuDKyyz4D4jIs8/YEq+P/rQFm1pzJcsedynU3HSAAILMkqEbXZJw4J091MOnhIVNPRipYOmC2TJDR29vDYn958xkqN3O/ZwztWpaX0xavM+citMuHh+fj8q2KfW6K2JCXr814T0Yx/1cnR/ZqmXyWyQW4WDR3gBTrV0bYPbaKnlB+vJZWNZqEQNv9VRmY7o52WaTddkDGY0O3KfG7cdKXxrOG0fySPg4nG1in2UFx4X/KJLtBmKLljwfqH17k4samyF8tOfSc1yfiXCHgVX1oQWi7mththxzusxtr6/WGlUlpfAf2jy1I2YxhYqjeVtsKoOVtkEF8F6Tn18V2plrtI4qu6A1lHToEA78h5RtTW3eNSs0RYAscV61YWjytFCFfZ1OJ9lbajRsUVruHV7Mh75ZNfdyuSErh4VAwscH99sDdvBzyJC2GR3VNfdsYzfV4pG3FVdd3H7J1ttuB0GTD8thA5FSYhuaRBJWtbZzYf7k4eH8Xg0Gl24XqErueF9h24wGD3SK3SXbW4KsiJdAnaWeuydCvCcKY885IIVgz2Pj+bIp6kHR/YuzjWLt02TXZ2d0cuZp+/p9Uz7zcyHhwfXy5n38uXM25vL63cf27DAjP/ir0vgzm9M5nQiyQof9HQDjHl0NU7nYlxrD+Fti6F69ZmpUwt4V/vqqo3v/LZdD4YXDuCdTHix+rlekg4fke2MEjf7LDe6LlpcvVBvKnCY3ywJrpScCsQseuiEVClCJjQrVs2YN05WirOD6jzB6xcdM5ALOVol2ulXDi9ecOBAlU1VgBbtuzgVJOVWyIPcH2oAjjVKl6L0OLDu5OAjHuQ27Lh147EvOZP1yBjhbQn/2931nmYZrxMsKZxavg24231K868baUgoq3hBEbxQ02ni2Qh/hoZeO56T7mdo6/Uj/kTrV/QQP1tTGSi+ln5koJiC6WcWLEcCpC2tLCEnKwFyshIgJysB0naZ2ULa0soS0pZVjhw5ciRC2k4zS0hbVtlC2tLKEtKWVbaQtrSyhLRllSNHjhyJkLbTzBLSllW2kLa0soScrATIyUoAtERlkZ6PvOhXfC39yETxtfQjA8W0/UCWwHLkeBmkrdpZAvKlePN85EW/4mvpRyaKOWIjbT+QJaQtq2whbWllCTlZCZCTlQBoicoiPR950a+YIzbSVu0sIW1ZZQtpSytLyMlKgJysBPg/xxWtj87hxY0AAAAASUVORK5CYII="
                : "https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
            }
          />
        </Link>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex justify-center items-center col-span-8">
        <form
          onSubmit={handleSearch}
          className="flex w-2/3 max-w-xl relative transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Search"
            className={`w-full pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm rounded-l-full outline-none text-black dark:text-white transition-all duration-300 ${
              isFocused ? "pl-10 focus:border-blue-500" : "pl-4"
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center px-5 border border-gray-300 dark:border-gray-700 border-l-0 bg-gray-100 dark:bg-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <CiSearch size={20} />
          </button>

          {/* Suggestion Dropdown */}
          {isFocused && suggestion.length > 0 && (
            <div>
              <CiSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              />
              <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                {suggestion.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-none"
                  >
                    <CiSearch
                      size={18}
                      className="text-gray-500 dark:text-gray-300"
                    />
                    <span className="text-sm text-black dark:text-white">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end gap-4 col-span-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {darkMode ? (
            <BsSun size={20} className="text-yellow-400" />
          ) : (
            <BsMoonStars
              size={20}
              className="text-gray-800 dark:text-gray-200"
            />
          )}
        </button>

        <img
          alt="user-logo"
          className="h-8 w-8 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600"
          src="https://yt3.ggpht.com/FHwWJjH3T5CFin8JbH6uq-m2Arcr_CtAheviY_7ipi9L3LRJp4JHeyNs_Ge7Gkzmq9EvBK9IRh4=s88-c-k-c0x00ffffff-no-rj"
        />
      </div>
    </div>
  );
}

export default Head;
