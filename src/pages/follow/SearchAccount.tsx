import {useState} from "react";
import {Account, getSearchAccount} from "@/service/account/account";
import {checkRelation, follow} from "@/service/relation/relation";
import {message} from "antd";
import Loading from "@/components/Loading";
import {searchPoems} from "@/components/sentence";

const SearchBox = (props: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Account[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const {setUpdate} = props;

    const handleSearch = (e: any) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length > 0) {
            setShowResults(true);
            setLoading(true);
            getSearchAccount(term).then((data) =>{
                setSearchResults(data);
                setLoading(false);
            });
        } else {
            setShowResults(false);
            setSearchResults([]);
        }
    };

    const handleFollow = (userId: string) => {
        checkRelation(userId).then((data) => {
            if (data) {
                message.error("已经关注");
            } else {
                follow(userId).then(() => {
                    message.success("关注成功");
                    setUpdate(true);
                });
            }
        });
    };

    return (
        <div className="relative">
            <input
                type="text"
                className="mb-2 w-full border rounded-md py-2 pl-3 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={searchPoems[Math.floor(Math.random() * searchPoems.length)]}
                value={searchTerm}
                onChange={handleSearch}
            />
            {showResults && loading && <Loading/>}
            {showResults && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {searchResults.length === 0 ? (
                        <div className="p-4 text-gray-500">无人</div>
                    ) : (
                        <ul className="divide-y divide-gray-300">
                            {searchResults.map((user) => (
                                <li key={user.userId}>
                                    <button
                                        type="button"
                                        className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => handleFollow(user.userId)}
                                    >
                                        <img
                                            src={`https://picsum.photos/50/50?random=${user.userId}`}
                                            alt={user.userName}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="font-bold">{user.userName}</div>
                                            <div className="text-gray-500">@{user.userId}</div>
                                        </div>
                                        <div className="ml-4">
                                            <button type="button"
                                                    className="px-2 py-1 border rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                                                关注
                                            </button>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
