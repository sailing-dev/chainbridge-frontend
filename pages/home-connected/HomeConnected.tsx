import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import style from './HomeConnected.module.scss';
import ArrowRight from 'components/assets/ArrowRight';
import ArrowDown from 'components/assets/ArrowDown';
import MainHeader from 'components/base/MainHeader';
import Footer from 'components/base/Footer';
import NetworkSelect from 'components/base/Select/NetworkSelect';
import ConfirmTransaction from 'components/ConfirmTransaction';
import GenericModal from 'components/GenericModal';
import { middleEllipsis, formatCaps } from 'utils/strings';
import { Option, options } from 'components/base/Select/NetworkSelect'
import { getProviderBalance, transfer } from 'helpers/wallet.helper';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { actions } from 'redux/walletUser/actions';
import { ChainTypes } from 'interfaces';

export interface HomeConnectedProps {
}

const HomeConnected: React.FC<HomeConnectedProps> = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const [capsToSwap, setCapsToSwap] = useState(0)
    const [popupConfirmationOpen, setPopupConfirmationOpen] = useState(false)
    const [selectedOptionFrom, setSelectedOptionFrom] = useState<Option | null>(options[0])
    const [isCapsInputFocused, setIsCapsInputFocused] = useState(false)
    let maskedTextInput:any = null;
    const updateProviderBalance = async () => {
        if (userWallet) {
            console.log('updateProviderBalance');
            const providerBalance = await getProviderBalance(userWallet.signer, selectedOptionFrom)
            console.log('providerBalance', providerBalance.toString());
            dispatch(actions.setCapsAmount(Number(providerBalance.toString())))
        }
    }
    useEffect(() => {
        updateProviderBalance()
        setCapsToSwap(0)
    }, [selectedOptionFrom?.value])
    useEffect(() => {
        if ((!userWallet)) {
            router.push('home-not-connected')
        }
    }, [userWallet])
    const handleChange = (option: Option, isFrom: boolean) => {
        if (isFrom) {
            setSelectedOptionFrom(option)
        } else {
            const firstOption = options.find(x => x.value !== option.value) || null
            setSelectedOptionFrom(firstOption)
        }
    }

    const handleTransfer = async () => {
        const amount = Number(capsToSwap);
        const transaction = await transfer(userWallet.signer, selectedOptionFrom, amount)
        setPopupConfirmationOpen(false)
        const receipt = await transaction.wait()
        updateProviderBalance();
    }
    const isAbleToSwap = capsToSwap && userWallet && userWallet.capsAmount && capsToSwap > 0 && capsToSwap <= userWallet.capsAmount
    return (
        <>
            <Head>
                <title>BSC ETH Bridge</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="BSC ETH Bridge, by Ternoa." />
            </Head>
            <MainHeader />
            <div className={"mainContainer"}>
                <MainHeader/>
                {userWallet && 
                    <div className={"container py-3 d-flex flex-column align-items-center"}>
                        <div className={style.intro}>The safe, fast and most secure way to swap Caps to binance smart chain.</div>
                        <div className={style.swapAddressLabel}>The swap will occur on your same adress</div>
                        <div className={style.address}>{userWallet.address && middleEllipsis(userWallet.address, 24)}</div>
                        <div className={"container px-2 py-3"}>
                            <div className={"row d-flex justify-content-center"}>
                                <div className={"col-12 col-md-5 px-0 mx-0"}>
                                    <span className={style.networkLabel}>From</span>
                                    <NetworkSelect
                                        selected={selectedOptionFrom}
                                        handleChange={handleChange}
                                        isFrom={true}
                                    />
                                </div>
                                <div className={style.middleArrow + " col-12 col-md-2"}>
                                    <div className={"align-self-center "}>
                                        <ArrowRight className={"d-none d-md-block"} />
                                        <ArrowDown className={"d-block d-md-none"} />
                                    </div>
                                </div>
                                <div className={"col-12 col-md-5 px-0"}>
                                    <span className={style.networkLabel}>To</span>
                                    <NetworkSelect
                                        selected={options.filter(x => x.value !== selectedOptionFrom?.value)[0]}
                                        handleChange={handleChange}
                                        isFrom={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.addNetwork}>
                            <span className={style.addNetworkLabel}>{"If you have not add Binance Smart Chain network in your MetaMask yet, please click "}</span>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener"
                                className={style.addNetworkButton}
                            >
                                Add Network
                        </a>
                            <span className={style.addNetworkLabel}>{" and continue."}</span>
                        </div>
                        <div className={"container d-flex justify-content-center px-0"}>
                            <div className={style.amountContainer}>
                                <div className={"px-2 pt-2 px-md-3 pt-md-3"}>Amount</div>
                                <div className={"row d-flex align-items-center px-2 pb-2 px-md-3 pb-md-0"}>
                                    <div className={"col-10"} onClick={() => maskedTextInput?.focus()}>
                                        <span className={style.capsAmount}>
                                            {formatCaps(capsToSwap) + " CAPS"}
                                            <input
                                                type="number"
                                                value={capsToSwap}
                                                onChange={(e) => Number(e.target.value)>=0 && Number(e.target.value)<=10000000000 && setCapsToSwap(Number(e.target.value))}
                                                ref={(input) => {maskedTextInput=input}}
                                                className={style.maskedInput}
                                                onFocus={() => setIsCapsInputFocused(true)}
                                                onBlur={() => setIsCapsInputFocused(false)}
                                            />
                                        </span>
                                    </div>
                                    <div className={"col-2"} onClick={() => setCapsToSwap(userWallet.capsAmount)}>
                                        <div className={"badge badge-pill " + style.maxButton}>
                                            Max
                                        </div>
                                    </div>
                                </div>
                                <hr className={style.divider + " " + (isCapsInputFocused ? style.dividerColored : "") } />
                            </div>
                        </div>
                        <div className={"pt-3"}>
                            <div className={`btn btn-primary rounded-pill ${isAbleToSwap ? "" : ""/*disabled */}`} onClick={(() => { setPopupConfirmationOpen(true); })}>
                                <div className={"d-flex align-items-center px-5 mx-5"}>
                                    <span className={style.buttonLabel}>Next</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />
                <ConfirmTransaction
                    open={popupConfirmationOpen}
                    setOpen={setPopupConfirmationOpen}
                    capsToSwap={capsToSwap}
                    from={selectedOptionFrom}
                    onConfirm={handleTransfer}
                />
                {/* Network error modal */}
                <GenericModal
                    isClosable={false}
                    isModalError={true}
                    open={(userWallet && userWallet.chainType===ChainTypes.other)}
                >
                    <div className={style.errorNetworkLabel}>
                        Please select  the ETH main network or the BSC main network in your wallet to continue
                    </div>
                </GenericModal>
            </div>
        </>
    )
}

export default HomeConnected;
