
const Web3 = require('web3');
const NFT_abi_user = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "re_address",
                "type": "address[]"
            }
        ],
        "name": "add_users",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUsers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUsersCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isRe",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const NFT_P = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "payees",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shares_",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ERC20PaymentReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }
        ],
        "name": "PayeeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReleased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "add_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "ft",
                "type": "bool"
            }
        ],
        "name": "calculate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPV",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_NFT_address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_nft_address",
                "type": "address"
            }
        ],
        "name": "get_NFT_tokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_conditional_value",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_interest_user",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_interest_value",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_usd_price",
                "type": "uint256"
            }
        ],
        "name": "get_p_AmountOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_r_time",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_received",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "us_address",
                "type": "address"
            }
        ],
        "name": "get_user_value",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "_token_id_no",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_day",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "b_time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "e_time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "f",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LBNFTpool.bof_info",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "token_id",
                "type": "uint256[]"
            }
        ],
        "name": "join",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "payee",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_NFT_address",
                "type": "address"
            }
        ],
        "name": "set_NFT_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_conditional_value",
                "type": "uint256"
            }
        ],
        "name": "set_conditional_value",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_interest",
                "type": "uint256"
            }
        ],
        "name": "set_interest_data",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "p_router_address",
                "type": "address"
            }
        ],
        "name": "set_p_router_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "p_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_usd_",
                "type": "address"
            }
        ],
        "name": "set_p_usd_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_peace_address",
                "type": "address"
            }
        ],
        "name": "set_peace_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_r_time",
                "type": "uint256"
            }
        ],
        "name": "set_r_time",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_send_lb_For",
                "type": "address"
            }
        ],
        "name": "set_send_NFT_For",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "shares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalShares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "update_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_conditional_value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_interest_value",
                "type": "uint256"
            }
        ],
        "name": "update_conditional_value",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
const LB_p = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "payees",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shares_",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ERC20PaymentReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }
        ],
        "name": "PayeeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReleased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "add_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            }
        ],
        "name": "budget_calculation",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            }
        ],
        "name": "calculate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPV",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_c_time",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_conditional_value",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "us_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_conditional_value",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_day",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "b_time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "e_time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_index_no",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "f",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LBpool.bof_info[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_interest",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_usd_price",
                "type": "uint256"
            }
        ],
        "name": "get_p_AmountOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_r_time",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            }
        ],
        "name": "get_received",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "join",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "payee",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_c_time",
                "type": "uint256"
            }
        ],
        "name": "set_c_time",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_conditional_value",
                "type": "uint256[]"
            }
        ],
        "name": "set_conditional_value",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_interest",
                "type": "uint256[]"
            }
        ],
        "name": "set_interest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "p_router_address",
                "type": "address"
            }
        ],
        "name": "set_p_router_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "p_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_usd_",
                "type": "address"
            }
        ],
        "name": "set_p_usd_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_peace_address",
                "type": "address"
            }
        ],
        "name": "set_peace_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_r_time",
                "type": "uint256"
            }
        ],
        "name": "set_r_time",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_send_lb_For",
                "type": "address"
            }
        ],
        "name": "set_send_lb_For",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "shares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalShares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "update_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_conditional_value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_interest_value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            }
        ],
        "name": "update_conditional_value",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const contract = {
    NFT_abi_user: '0x4E2CA20308101ccE1Fd9A1785Fbe649d1Ea57772',
    LB_abi_user: '0x6Dc141788913a2e6f4234d655C607228bDdc9913',
    nft_p: '0xa407f1d82ca640b1acd50865225d681487e8c37a',
    LB_p: '0x0dc50c2c6228fc3289f32869690ef4224fbff75c',

};

function ToPercentage(progress,max) {
    return ((max - progress) / max * 100).toFixed(0)
}
export default async function (callback) {

    let web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");


    let web3C = new Web3("https://bsc-dataseed.binance.org/");

    const dai_nft_user = new web3.eth.Contract(NFT_abi_user, contract.NFT_abi_user);
    const dai_LB_user = new web3.eth.Contract(NFT_abi_user, contract.LB_abi_user);

    const cropData_nft_users = await dai_nft_user.methods.getUsers().call();

    const cropData_LB_users = await dai_LB_user.methods.getUsers().call();

    console.log(cropData_nft_users);
    console.log(cropData_LB_users);

    const web3C_LB_p = new web3C.eth.Contract(LB_p, contract.LB_p);
    const web3C_nft_p = new web3C.eth.Contract(NFT_P, contract.nft_p);

    let k = 0;

    let dk = 0;

    var BN = web3.utils.BN;

    const maxLength = cropData_LB_users.length + cropData_nft_users.length
    let progress = maxLength;//进度条

    for (let i = 0; i < cropData_LB_users.length; i++) {
        if(callback) {
            if (progress > 0) {
                progress = progress - 1
                callback(ToPercentage(progress,maxLength))
            }
        }
        try {
            const dd = await web3C_LB_p.methods.calculate("0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322", cropData_LB_users[i], 0).call();
            const dd2 = await web3C_LB_p.methods.calculate("0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322", cropData_LB_users[i], 1).call();
            console.log("dd", dd);
            console.log("dd2", dd2);
            // console.log("DD === ",dd / 1000000000000000000);
            // console.log( "dd2 ====",dd2 / 1000000000000000000);

            new BN().add(new BN());

            if (dd > 0) {
                k = new BN(k).add(new BN(dd)).toString();
                // k += web3.utils.fromWei(dd, 'ether');
            }
            if (dd2 > 0) {
                k = new BN(k).add(new BN(dd2)).toString();
            }
        } catch (error) {
            //console.log(error);
        }

    }
    console.log("K============", k);

    k = await web3C_LB_p.methods.get_p_AmountOut(new BN(k).toString()).call();
    console.log("K============2", k);
    for (let i = 0; i < cropData_nft_users.length; i++) {
        if(callback) {
            if (progress > 0) {
                progress = progress - 1
                callback(ToPercentage(progress,maxLength))
            }
        }
        const a = await web3C_nft_p.methods.calculate(cropData_nft_users[i], true).call();

        dk = new BN(dk).add(new BN(a)).toString();
        //dk += Number(a);
        //Number(dk);
    }
    console.log("K============3", dk);
    dk = await web3C_nft_p.methods.get_p_AmountOut(new BN(dk).toString()).call();
    console.log("K============3", dk);
    return "预计质押LB需要支付： " + (k / 1000000000000000000) + " peace ，预计质押NFT需要支付： " + (dk / 1000000000000000000) + " peace";
}
