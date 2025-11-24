// src/modes/kids/KidsApp.jsx
import React, { useEffect, useState } from "react";
import "../../App.css";
import { useAtmSession } from "../../useAtmSession";
import KidsSavingsGoal from "./kidssavingsgoal";

/* ---------- Language setup ---------- */

const LANGUAGE_PILL_LABEL = {
EN: "EN",
ZH: "中文",
MS: "MS",
TA: "TA",
};

const STRINGS = {
welcome_title: {
EN: "Welcome to OCBC",
ZH: "欢迎使用华侨银行",
MS: "Selamat datang ke OCBC",
TA: "OCBC வங்கிக்கு வரவேற்கிறோம்",
},
insert_card: {
EN: "Tap to start your banking adventure!",
ZH: "点击开始你的银行冒险！",
MS: "Ketik untuk mulakan pengembaraan bank anda!",
TA: "உங்கள் வங்கி சாகசத்தைத் தொடங்க தட்டவும்!",
},
scan_face_title: {
EN: "SCAN YOUR FACE",
ZH: "扫描你的脸部",
MS: "Imbas wajah anda",
TA: "உங்கள் முகத்தை ஸ்கேன் செய்யவும்",
},
scan_face_helper: {
EN: "Look at the screen and smile!",
ZH: "看着屏幕，露出笑容！",
MS: "Lihat skrin dan senyum!",
TA: "திரையை நோக்கி சிரிக்கவும்!",
},
scanning: {
EN: "Scanning...",
ZH: "正在扫描…",
MS: "Mengimbas…",
TA: "ஸ்கேன் செய்யப்படுகிறது…",
},
scan_complete: {
EN: "Scan complete",
ZH: "扫描完成",
MS: "Imbasan selesai",
TA: "ஸ்கேன் முடிந்தது",
},
main_menu_title: {
EN: "Main Menu",
ZH: "主页菜单",
MS: "Menu utama",
TA: "முக்கிய மெனு",
},
main_menu_subtitle: {
EN: "What would you like to do today?",
ZH: "你今天想做什么？",
MS: "Apa yang anda mahu lakukan hari ini?",
TA: "இன்று என்ன செய்ய விரும்புகிறீர்கள்?",
},
deposit_cash: {
EN: "Deposit Pocket Money",
ZH: "存入零花钱",
MS: "Deposit duit belanja",
TA: "பாக்கெட் பணம் வைப்பு",
},
account_balance: {
EN: "Check My Balance",
ZH: "查看我的余额",
MS: "Semak baki saya",
TA: "என் இருப்பை பார்க்க",
},
withdraw_cash: {
EN: "Withdraw Cash",
ZH: "提取现金",
MS: "Pengeluaran tunai",
TA: "பணம் எடுத்தல்",
},
exit: {
EN: "Exit",
ZH: "退出",
MS: "Tamat",
TA: "முடி",
},
deposit_title: {
EN: "Deposit Pocket Money",
ZH: "存入零花钱",
MS: "Deposit duit belanja",
TA: "பாக்கெட் பணம் வைப்பு",
},
deposit_subtitle: {
EN: "Insert your notes into the slot.",
ZH: "将纸币放入投入口。",
MS: "Masukkan wang kertas ke dalam ruang.",
TA: "உங்கள் நோட்டுகளை இடைவெளியில் இடுங்கள்.",
},
counting_title: {
EN: "Counting your savings",
ZH: "正在计算你的储蓄",
MS: "Mengira simpanan anda",
TA: "உங்கள் சேமிப்புகளை எண்ணுகிறது",
},
counting_subtitle: {
EN: "Please wait while we count your money.",
ZH: "请稍候，我们正在计算你的钱。",
MS: "Sila tunggu sementara kami mengira wang anda.",
TA: "உங்கள் பணத்தை எண்ணும் வரை காத்திருக்கவும்.",
},
transaction_completed: {
EN: "SAVINGS UPDATED!",
ZH: "储蓄已更新！",
MS: "Simpanan dikemas kini!",
TA: "சேமிப்புகள் புதுப்பிக்கப்பட்டன!",
},
your_balance_label: {
EN: "YOUR BALANCE",
ZH: "你的余额",
MS: "Baki anda",
TA: "உங்கள் இருப்பு",
},
print_receipt_question: {
EN: "WOULD YOU LIKE A RECEIPT?",
ZH: "你需要收据吗？",
MS: "Adakah anda mahu resit?",
TA: "ரசீது வேண்டுமா?",
},
another_txn_question: {
EN: "DO YOU WANT TO DO SOMETHING ELSE?",
ZH: "你想做别的事吗？",
MS: "Anda mahu buat perkara lain?",
TA: "வேறு ஏதும் செய்ய விரும்புகிறீர்களா?",
},
thank_you_title: {
EN: "Great job saving today!",
ZH: "今天的储蓄很棒！",
MS: "Tahniah, anda menabung hari ini!",
TA: "இன்று சேமித்தது அருமை!",
},
enter_pin_title: {
EN: "Enter your PIN",
ZH: "请输入你的密码",
MS: "Masukkan PIN anda",
TA: "உங்கள் பினை உள்ளிடவும்",
},
forgot_pin: {
EN: "Forgot PIN?",
ZH: "忘记密码？",
MS: "Lupa PIN?",
TA: "பின் மறந்துவிட்டதா?",
},
pin_error: {
EN: "Incorrect PIN. Try again.",
ZH: "密码错误，请再试一次。",
MS: "PIN salah, cuba lagi.",
TA: "தவறான பின், மீண்டும் முயலவும்.",
},
withdraw_title: {
EN: "Withdraw Cash",
ZH: "提取现金",
MS: "Pengeluaran tunai",
TA: "பணம் எடுத்தல்",
},
withdraw_subtitle: {
EN: "Choose how much you want to take out.",
ZH: "选择你想取出的金额。",
MS: "Pilih jumlah yang anda mahu keluarkan.",
TA: "எவ்வளவு எடுக்க விரும்புகிறீர்கள் என்பதைத் தேர்வு செய்யவும்.",
},
withdraw_custom_label: {
EN: "Other amount (SGD)",
ZH: "其他金额（新币）",
MS: "Jumlah lain (SGD)",
TA: "மற்ற தொகை (SGD)",
},
btn_yes: { EN: "YES", ZH: "是", MS: "YA", TA: "ஆம்" },
btn_no: { EN: "NO", ZH: "否", MS: "TIDAK", TA: "இல்லை" },
btn_cancel: { EN: "CANCEL", ZH: "取消", MS: "BATAL", TA: "ரத்து" },
btn_back: { EN: "BACK", ZH: "返回", MS: "KEMBALI", TA: "பின் செல்" },
btn_continue: {
EN: "CONTINUE",
ZH: "继续",
MS: "TERUSKAN",
TA: "தொடரவும்",
},
btn_main_menu: {
EN: "MAIN MENU",
ZH: "主菜单",
MS: "MENU UTAMA",
TA: "முக்கிய மெனு",
},
btn_next: { EN: "NEXT", ZH: "下一步", MS: "SETERUSNYA", TA: "அடுத்து" },
btn_confirm: {
EN: "CONFIRM",
ZH: "确认",
MS: "SAHKAN",
TA: "உறுதிப்படுத்தவும்",
},
savings_goal_button_label: {
EN: "My Savings Goal",
ZH: "我的储蓄目标",
MS: "Matlamat Simpanan Saya",
TA: "என் சேமிப்பு இலக்கு",
},

// Savings goal screen
savings_goal_title: {
EN: "My Savings Goal",
ZH: "我的储蓄目标",
MS: "Matlamat Simpanan Saya",
TA: "என் சேமிப்பு இலக்கு",
},
savings_goal_saving_for: {
EN: "You're saving for:",
ZH: "你的储蓄目标：",
MS: "Anda menabung untuk:",
TA: "நீங்கள் சேமிப்பது:",
},
savings_goal_helper: {
EN: "You can update this goal from the mobile app.",
ZH: "你可以在手机应用中更新这个目标。",
MS: "Anda boleh mengemas kini matlamat ini dari aplikasi mudah alih.",
TA: "இந்த இலக்கை மொபைல் செயலியில் மாற்றலாம்.",
},

// Kids “More fun banking” screen
kids_see_more_title: {
EN: "More fun banking",
ZH: "更多好玩银行活动",
MS: "Perbankan yang lebih menyeronokkan",
TA: "மேலும் வேடிக்கையான வங்கி",
},
kids_see_more_body: {
EN: "This area can show fun tips, challenges, or badges to encourage kids to save more.",
ZH: "这里可以显示有趣的小提示、挑战或徽章，鼓励孩子多储蓄。",
MS: "Bahagian ini boleh memaparkan tip, cabaran atau lencana yang menyeronokkan untuk galakkan kanak-kanak menabung.",
TA: "இங்கே குழந்தைகள் சேமிக்க ஊக்கமளிக்கும் குறிப்புகள், சவால்கள் அல்லது பதக்கங்கள் காட்டலாம்.",
},
kids_see_more_back_btn: {
EN: "Back to main menu",
ZH: "返回主菜单",
MS: "Kembali ke menu utama",
TA: "முதன்மை மெனுவுக்கு திரும்பு",
},

// Main menu extra button
kids_more_fun_banking_btn: {
EN: "More fun banking",
ZH: "更多好玩银行活动",
MS: "Perbankan yang lebih menyeronokkan",
TA: "மேலும் வேடிக்கையான வங்கி",
},
};

const tKey = (lang, key) =>
STRINGS[key]?.[lang] || STRINGS[key]?.EN || key;

/* ---------- Kids App ---------- */

const KIDS_PREFS = {
fontSize: "large",
fontColour: "default",
defaultLanguage: "EN",
};

const KIDS_FEATURES = {
depositCash: true,
withdrawCash: false, // can toggle later
accountBalance: true,
};

function KidsApp() {
const [screen, setScreen] = useState("insertCard");
const [pin, setPin] = useState("123456");
const [balance, setBalance] = useState(80);
const [accountBalance, setAccountBalance] = useState(80);

const [language, setLanguage] = useState(KIDS_PREFS.defaultLanguage);
const [languageLocked, setLanguageLocked] = useState(false);
const [showLangMenu, setShowLangMenu] = useState(false);
const [withdrawAmount, setWithdrawAmount] = useState(0);

const { setAuthenticated, setCurrentScreen, resetSession } =
useAtmSession("kidsSession");

const t = (key) => tKey(language, key);

const goTo = (next) => {
setScreen(next);
setCurrentScreen(next);
};

useEffect(() => {
if (!languageLocked) {
    setLanguage(KIDS_PREFS.defaultLanguage || "EN");
}
}, [languageLocked]);

const handleLanguageSelect = (code) => {
setLanguage(code);
setLanguageLocked(true);
setShowLangMenu(false);
};

const rootClasses = [
"atm-root",
"atm-root--light",
KIDS_PREFS.fontSize === "large"
    ? "atm-root--font-lg"
    : KIDS_PREFS.fontSize === "xlarge"
    ? "atm-root--font-xl"
    : "atm-root--font-md",
KIDS_PREFS.fontColour === "highContrast"
    ? "atm-root--high-contrast"
    : "",
"kids-mode-root", // extra class if you want special CSS
]
.filter(Boolean)
.join(" ");


return (
<div className={rootClasses}>
<div className="atm-frame kids-atm-frame">
    <header className="atm-header atm-screen-contents">
    <div>
        <img src="/images/OCBC.png" alt="ATM Logo" width="100" />
    </div>

    <div className="atm-header-right">
        <div className="atm-language-wrapper">
        <button
            className="atm-language-pill"
            type="button"
            onClick={() => setShowLangMenu((s) => !s)}
        >
            {LANGUAGE_PILL_LABEL[language]}
        </button>

        {showLangMenu && (
            <div className="atm-language-menu">
            <button onClick={() => handleLanguageSelect("EN")}>English</button>
            <button onClick={() => handleLanguageSelect("ZH")}>中文</button>
            <button onClick={() => handleLanguageSelect("MS")}>Melayu</button>
            <button onClick={() => handleLanguageSelect("TA")}>தமிழ்</button>
            </div>
        )}
        </div>
    </div>
    </header>

    {/* Flow (everything else stays the same) */}
    {screen === "insertCard" && <InsertCardScreen goTo={goTo} t={t} />}
    {screen === "pinEntry" && (
    <PinEntryScreen
        goTo={goTo}
        t={t}
        pin={pin}
        onPinSuccess={() => setAuthenticated(true)}
    />
    )}
    {screen === "scanFace" && <ScanFaceScreen goTo={goTo} t={t} />}
    {screen === "mainMenu" && (
    <MainMenuScreen goTo={goTo} t={t} features={KIDS_FEATURES} />
    )}
    {screen === "seeMore" && <SeeMoreScreen goTo={goTo} />}
    {screen === "savingsGoal" && <KidsSavingsGoal goTo={goTo} />}
    {screen === "depositCash" && <DepositCashScreen goTo={goTo} t={t} />}
    {screen === "countingCash" && (
    <CountingCashScreen
        goTo={goTo}
        t={t}
        onDone={() => {
        setBalance((b) => b + 10);
        setAccountBalance((b) => b + 10);
        }}
    />
    )}
    {screen === "transactionCompleted" && (
    <TransactionCompletedScreen goTo={goTo} t={t} balance={balance} />
    )}
    {screen === "printReceipt" && <PrintReceiptScreen goTo={goTo} t={t} />}
    {screen === "anotherTransaction" && (
    <AnotherTransactionScreen goTo={goTo} t={t} />
    )}
    {screen === "accountBalance" && (
    <AccountBalanceScreen
        goTo={goTo}
        t={t}
        accountBalance={accountBalance}
    />
    )}
    {screen === "withdrawCash" && (
    <WithdrawCashScreen
        goTo={goTo}
        t={t}
        withdrawAmount={withdrawAmount}
        setWithdrawAmount={setWithdrawAmount}
        onConfirm={(amount) => {
        setWithdrawAmount(amount);
        setAccountBalance((b) => Math.max(0, b - amount));
        setBalance((b) => Math.max(0, b - amount));
        goTo("transactionCompleted");
        }}
    />
    )}
    {screen === "changePin" && (
    <KidsChangePinScreen goTo={goTo} t={t} onPinChanged={setPin} />
    )}
    {screen === "thankYou" && (
    <ThankYouScreen goTo={goTo} t={t} onReset={resetSession} />
    )}
</div>
</div>
);


/* ---------- Kids Screens ---------- */

function InsertCardScreen({ goTo, t }) {
return (
<div className="atm-welcome atm-screen-contents">
    <h1 className="atm-title">{t("welcome_title")}</h1>
    <div className="atm-card-shell">
    <div className="atm-card-screen">
        <div className="atm-card-icon" />
        <p className="atm-subtitle center" style={{ marginTop: 16 }}>
        {t("insert_card")}
        </p>
        <button
        className="atm-primary-btn atm-start-btn"
        onClick={() => goTo("pinEntry")}
        >
        {t("btn_continue")}
        </button>
    </div>
    </div>
</div>
);
}

function PinEntryScreen({ goTo, t, pin, onPinSuccess }) {
  const [inputPin, setInputPin] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setInputPin(onlyDigits);
  };

  const handleSubmit = () => {
    if (inputPin === pin) {
      setError("");
      setInputPin("");
      onPinSuccess?.();
      goTo("mainMenu");
    } else {
      setError(t("pin_error"));
      setInputPin("");
    }
  };

  const handleForgotPin = () => {
    setError("Please ask your parents for help with your PIN");
    setInputPin("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <main className="atm-main">
      <div className="atm-card atm-screen-contents">
        <button
          className="atm-back-btn"
          onClick={() => goTo("insertCard")}
          aria-label="Back"
        >
          ←
        </button>

        <h2 className="atm-card-title center">{t("enter_pin_title")}</h2>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={inputPin}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className="atm-pin-input"
          aria-label={t("enter_pin_title")}

        />

        {error && <p className="atm-pin-error">{error}</p>}

        <div className="atm-card-footer center">
          <button
            className="atm-primary-btn"
            type="button"
            onClick={handleSubmit}
          >
            {t("btn_confirm")}
          </button>
          <button
            className="atm-forgot-pin-link"
            type="button"
            onClick={handleForgotPin}
          >
            {t("forgot_pin")}
          </button>
        </div>
      </div>
    </main>
  );
}

function ScanFaceScreen({ goTo, t }) {
const [scanning, setScanning] = useState(true);

useEffect(() => {
const timer = setTimeout(() => {
    setScanning(false);
    goTo("mainMenu");
}, 2500);
return () => clearTimeout(timer);
}, [goTo]);

return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">{t("scan_face_title")}</h2>

    <div className="atm-face-circle-wrapper">
        <div
        className={
            "atm-face-circle " +
            (scanning ? "atm-face-circle--scanning" : "")
        }
        >
        <div className="atm-face-scan-line" />
        </div>
    </div>

    <p className="atm-helper-text">{t("scan_face_helper")}</p>

    <div className="atm-scan-progress">
        <div className="atm-scan-progress-inner" />
    </div>
    <p className="atm-scan-status">
        {scanning ? t("scanning") : t("scan_complete")}
    </p>
    </div>
</main>
);
}

function MainMenuScreen({ goTo, t, features }) {
const buttons = [];

if (features.depositCash) {
buttons.push(
    <button
    key="deposit"
    className="atm-menu-btn"
    onClick={() => goTo("depositCash")}
    >
    {t("deposit_cash")}
    </button>
);
}

if (features.accountBalance) {
buttons.push(
    <button
    key="balance"
    className="atm-menu-btn"
    onClick={() => goTo("accountBalance")}
    >
    {t("account_balance")}
    </button>
);
}

if (features.withdrawCash) {
buttons.push(
    <button
    key="withdraw"
    className="atm-menu-btn"
    onClick={() => goTo("withdrawCash")}
    >
    {t("withdraw_cash")}
    </button>
);
}

buttons.push(
    <button
      key="savings"
      className="atm-menu-btn"
      onClick={() => goTo("savingsGoal")}
    >
      {t("savings_goal_button_label")}
    </button>
  );


// Kids: See more
buttons.push(
<button
    key="seeMore"
    className="atm-menu-btn"
    onClick={() => goTo("seeMore")}
>
    More fun banking
</button>
);

// Finish
buttons.push(
<button
    key="exit"
    className="atm-menu-btn atm-menu-btn--danger"
    onClick={() => goTo("thankYou")}
>
    {t("exit")}
</button>
);

return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">{t("main_menu_title")}</h2>
    <p className="atm-subtitle center">{t("main_menu_subtitle")}</p>
    <div className="atm-menu-grid">{buttons}</div>
    </div>
</main>
);
}

function SeeMoreScreen({ goTo }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <button
        className="atm-back-btn"
        onClick={() => goTo("mainMenu")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">More fun banking</h2>
    <p className="atm-subtitle center">
        This area can show fun tips, challenges, or badges to encourage
        kids to save more.
    </p>

    <div className="atm-card-footer center">
        <button
        className="atm-primary-btn"
        onClick={() => goTo("mainMenu")}
        >
        Back to main menu
        </button>
    </div>
    </div>
</main>
);
}

// The rest of the screens (DepositCashScreen, CountingCashScreen, etc.)
// are the same pattern as Elderly/Custom; you can reuse those components
// directly or copy them over and tweak the text if needed.

function DepositCashScreen({ goTo, t }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <button
        className="atm-back-btn"
        onClick={() => goTo("mainMenu")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">{t("deposit_title")}</h2>
    <p className="atm-subtitle center">{t("deposit_subtitle")}</p>

    <div className="atm-slot-graphic">
        <div className="slot-top" />
        <div className="slot-middle">
        <div className="slot-hole" />
        </div>
        <div className="slot-bottom" />
    </div>

    <div className="atm-card-footer right">
        <button
        className="atm-secondary-btn"
        onClick={() => goTo("thankYou")}
        >
        {t("btn_cancel")}
        </button>
        <button
        className="atm-primary-btn"
        onClick={() => goTo("countingCash")}
        >
        {t("btn_next")}
        </button>
    </div>
    </div>
</main>
);
}

function CountingCashScreen({ goTo, t, onDone }) {
const handleNext = () => {
onDone();
goTo("transactionCompleted");
};

return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <button
        className="atm-back-btn"
        onClick={() => goTo("depositCash")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">{t("counting_title")}</h2>
    <p className="atm-subtitle center">{t("counting_subtitle")}</p>

    <div className="atm-spinner-coin" />

    <div className="atm-card-footer right">
        <button
        className="atm-secondary-btn"
        onClick={() => goTo("thankYou")}
        >
        {t("btn_cancel")}
        </button>
        <button className="atm-primary-btn" onClick={handleNext}>
        {t("btn_next")}
        </button>
    </div>
    </div>
</main>
);
}

function TransactionCompletedScreen({ goTo, t, balance }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">
        {t("transaction_completed")}
    </h2>

    <div className="atm-balance-row">
        <div className="atm-money-icon">💵</div>
        <div className="atm-balance-text">
        <span className="atm-subtitle">
            {t("your_balance_label")}
        </span>
        <div className="atm-balance-amount">
            ${balance.toLocaleString("en-US")}
        </div>
        </div>
    </div>

    <div className="atm-card-footer right">
        <button
        className="atm-primary-btn"
        onClick={() => goTo("printReceipt")}
        >
        {t("btn_continue")}
        </button>
    </div>
    </div>
</main>
);
}

function PrintReceiptScreen({ goTo, t }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <button
        className="atm-back-btn"
        onClick={() => goTo("transactionCompleted")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">
        {t("print_receipt_question")}
    </h2>

    <div className="atm-yesno-column">
        <button
        className="atm-primary-btn"
        onClick={() => goTo("anotherTransaction")}
        >
        {t("btn_yes")}
        </button>
        <button
        className="atm-secondary-btn"
        onClick={() => goTo("anotherTransaction")}
        >
        {t("btn_no")}
        </button>
    </div>
    </div>
</main>
);
}

function AnotherTransactionScreen({ goTo, t }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">
        {t("another_txn_question")}
    </h2>

    <div className="atm-yesno-column">
        <button
        className="atm-primary-btn"
        onClick={() => goTo("mainMenu")}
        >
        {t("btn_yes")}
        </button>
        <button
        className="atm-secondary-btn"
        onClick={() => goTo("thankYou")}
        >
        {t("btn_no")}
        </button>
    </div>
    </div>
</main>
);
}

function AccountBalanceScreen({ goTo, t, accountBalance }) {
return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">{t("account_balance")}</h2>

    <div className="atm-balance-row">
        <div className="atm-money-icon">💵</div>
        <div className="atm-balance-text">
        <span className="atm-subtitle">
            {t("your_balance_label")}
        </span>
        <div className="atm-balance-amount">
            ${accountBalance.toLocaleString("en-US")}
        </div>
        </div>
    </div>

    <div className="atm-card-footer right">
        <button
        className="atm-primary-btn"
        onClick={() => goTo("mainMenu")}
        >
        {t("btn_main_menu")}
        </button>
    </div>
    </div>
</main>
);
}

function WithdrawCashScreen({
goTo,
t,
withdrawAmount,
setWithdrawAmount,
onConfirm,
}) {
const quickAmounts = [5, 10, 20, 50];

const handleCustomChange = (e) => {
const val = e.target.value.replace(/[^\d]/g, "");
setWithdrawAmount(val === "" ? 0 : Number(val));
};

const handleConfirm = () => {
if (withdrawAmount > 0) {
    onConfirm(withdrawAmount);
}
};

return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <button
        className="atm-back-btn"
        onClick={() => goTo("mainMenu")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">{t("withdraw_title")}</h2>
    <p className="atm-subtitle center">{t("withdraw_subtitle")}</p>

    <div className="atm-quick-amounts">
        {quickAmounts.map((amt) => (
        <button
            key={amt}
            type="button"
            className={
            "atm-quick-amount-btn" +
            (withdrawAmount === amt
                ? " atm-quick-amount-btn--active"
                : "")
            }
            onClick={() => setWithdrawAmount(amt)}
        >
            ${amt}
        </button>
        ))}
    </div>

    <div className="atm-withdraw-custom">
        <label className="atm-withdraw-label">
        {t("withdraw_custom_label")}
        </label>
        <input
        type="text"
        inputMode="numeric"
        className="atm-withdraw-input"
        value={withdrawAmount || ""}
        onChange={handleCustomChange}
        />
    </div>

    <div className="atm-card-footer right">
        <button
        className="atm-secondary-btn"
        onClick={() => goTo("mainMenu")}
        >
        {t("btn_cancel")}
        </button>
        <button
        className="atm-primary-btn"
        onClick={handleConfirm}
        disabled={!withdrawAmount || withdrawAmount <= 0}
        >
        {t("btn_confirm")}
        </button>
    </div>
    </div>
</main>
);
}
function KidsChangePinScreen({ goTo, t, onPinChanged }) {
const [step, setStep] = useState(1);
const [firstPin, setFirstPin] = useState("");
const [secondPin, setSecondPin] = useState("");
const [error, setError] = useState("");

const handleNext = () => {
if (step === 1) {
    if (firstPin.length !== 6) {
    setError("PIN must be 6 digits.");
    return;
    }
    setError("");
    setStep(2);
} else {
    if (secondPin !== firstPin) {
    setError("PINs do not match.");
    setSecondPin("");
    return;
    }

    onPinChanged(firstPin);     // ← THIS USES setPin()
    goTo("pinChanged");
}
};

return (
<div className="kids-card">
    <h2>{t("change_pin_title")}</h2>
    <input
    type="password"
    maxLength={6}
    value={step === 1 ? firstPin : secondPin}
    onChange={(e) =>
        step === 1
        ? setFirstPin(e.target.value.replace(/\D/g, ""))
        : setSecondPin(e.target.value.replace(/\D/g, ""))
    }
    />
    {error && <p className="error">{error}</p>}
    <button onClick={handleNext}>
    {step === 1 ? t("btn_next") : t("btn_confirm")}
    </button>
</div>
);
}


function ThankYouScreen({ goTo, t, onReset }) {
useEffect(() => {
onReset?.();
const timer = setTimeout(() => {
    goTo("insertCard");
}, 2000);
return () => clearTimeout(timer);
}, [goTo, onReset]);

return (
<main className="atm-main">
    <div className="atm-card atm-screen-contents">
    <h2 className="atm-card-title center">{t("thank_you_title")}</h2>
    </div>
</main>
);
}
}
export default KidsApp;
