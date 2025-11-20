// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { useAtmFeatures } from "./useAtmFeatures";
import { useAtmPreferences } from "./useAtmPreferences";
import { useAtmSession } from "./useAtmSession";

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
    EN: "Please insert your card.",
    ZH: "请插入您的银行卡。",
    MS: "Sila masukkan kad anda.",
    TA: "தயவு செய்து உங்கள் கார்டை உள்ளிடவும்.",
  },
  scan_face_title: {
    EN: "SCAN YOUR FACE",
    ZH: "扫描你的脸部",
    MS: "Imbas wajah anda",
    TA: "உங்கள் முகத்தை ஸ்கேன் செய்யவும்",
  },
  scan_face_helper: {
    EN: "Ensure your face is within the circle.",
    ZH: "请确保脸部在圆圈内。",
    MS: "Pastikan wajah anda dalam bulatan.",
    TA: "உங்கள் முகம் வளையத்துக்குள் இருப்பதை உறுதிசெய்க.",
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
    EN: "Please choose the transaction you would like to perform.",
    ZH: "请选择您要进行的交易。",
    MS: "Sila pilih transaksi yang ingin anda lakukan。",
    TA: "நீங்கள் செய்ய விரும்பும் பரிவர்த்தனையைத் தேர்வு செய்யவும்。",
  },
  deposit_cash: {
    EN: "Deposit Cash",
    ZH: "存入现金",
    MS: "Deposit tunai",
    TA: "பணம் வைப்பு",
  },
  account_balance: {
    EN: "Account Balance",
    ZH: "账户余额",
    MS: "Baki akaun",
    TA: "கணக்கு இருப்பு",
  },
  withdraw_cash: {
    EN: "Withdraw Cash",
    ZH: "提取现金",
    MS: "Pengeluaran tunai",
    TA: "பணம் எடுத்தல்",
  },
  change_pin: {
    EN: "Change PIN",
    ZH: "更改密码",
    MS: "Tukar PIN",
    TA: "பின் மாற்றம்",
  },
  exit: {
    EN: "Exit",
    ZH: "退出",
    MS: "Keluar",
    TA: "வெளியேறு",
  },
  deposit_title: {
    EN: "Deposit Cash",
    ZH: "存入现金",
    MS: "Deposit tunai",
    TA: "பணம் வைப்பு",
  },
  deposit_subtitle: {
    EN: "Insert your cash into the open slot.",
    ZH: "请将现金放入打开的投入口。",
    MS: "Masukkan wang tunai ke dalam ruang yang terbuka.",
    TA: "திறந்த இடைவெளியில் உங்கள் பணத்தை நுழைக்கவும்.",
  },
  counting_title: {
    EN: "Counting your cash",
    ZH: "正在点算现金",
    MS: "Mengira wang tunai anda",
    TA: "உங்கள் பணத்தை எண்ணுகிறது",
  },
  counting_subtitle: {
    EN: "Please wait while the machine counts your notes.",
    ZH: "请稍候，机器正在点算纸币。",
    MS: "Sila tunggu sementara mesin mengira wang kertas anda.",
    TA: "இயந்திரம் உங்கள் நோட்டுகளை எண்ணும் வரை காத்திருக்கவும்.",
  },
  transaction_completed: {
    EN: "TRANSACTION COMPLETED!",
    ZH: "交易已完成！",
    MS: "Transaksi selesai!",
    TA: "பரிவர்த்தனை முடிந்தது!",
  },
  your_balance_label: {
    EN: "YOUR BALANCE",
    ZH: "您的余额",
    MS: "Baki anda",
    TA: "உங்கள் இருப்பு",
  },
  print_receipt_question: {
    EN: "WOULD YOU LIKE A PRINTED RECEIPT?",
    ZH: "您需要打印收据吗？",
    MS: "ADAKAH ANDA MAHU RESIT BERCETAK?",
    TA: "அச்சு ரசீது வேண்டுமா?",
  },
  another_txn_question: {
    EN: "WOULD YOU LIKE TO PERFORM ANOTHER TRANSACTION?",
    ZH: "您要进行另一项交易吗？",
    MS: "ADAKAH ANDA MAHU MELAKUKAN TRANSAKSI LAIN?",
    TA: "இன்னொரு பரிவர்த்தனையைச் செய்ய விரும்புகிறீர்களா?",
  },
  change_pin_title: {
    EN: "Change PIN",
    ZH: "更改密码",
    MS: "Tukar PIN",
    TA: "பின் மாற்றம்",
  },
  change_pin_subtitle: {
    EN: "ENTER NEW 6-DIGIT PIN",
    ZH: "请输入新的6位密码",
    MS: "MASUKKAN PIN 6 DIGIT BAHARU",
    TA: "புதிய 6 இலக்க பினை உள்ளிடவும்",
  },
  change_pin_subtitle_confirm: {
    EN: "RE-ENTER NEW PIN TO CONFIRM",
    ZH: "请再次输入新密码以确认",
    MS: "MASUKKAN SEMULA PIN UNTUK SAHKAN",
    TA: "உறுதிப்படுத்த புதிய பினை மீண்டும் உள்ளிடவும்",
  },
  pin_changed_title: {
    EN: "PIN SUCCESSFULLY CHANGED",
    ZH: "密码已成功更改",
    MS: "PIN BERJAYA DITUKAR",
    TA: "பின் வெற்றிகரமாக மாற்றப்பட்டது",
  },
  thank_you_title: {
    EN: "THANK YOU FOR BANKING WITH OCBC!",
    ZH: "感谢您使用华侨银行！",
    MS: "TERIMA KASIH KERANA BERURUSAN DENGAN OCBC!",
    TA: "OCBC வங்கியை பயன்படுத்தியதற்காக நன்றி!",
  },
  enter_pin_title: {
    EN: "Enter your PIN",
    ZH: "请输入您的密码",
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
    EN: "Incorrect PIN. Please try again.",
    ZH: "密码错误。请重试。",
    MS: "PIN salah. Sila cuba lagi.",
    TA: "தவறான பின். தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
  },
  withdraw_title: {
    EN: "Withdraw Cash",
    ZH: "提取现金",
    MS: "Pengeluaran tunai",
    TA: "பணம் எடுத்தல்",
  },
  withdraw_subtitle: {
    EN: "Choose an amount or enter your own.",
    ZH: "请选择金额或输入其他金额。",
    MS: "Pilih jumlah atau masukkan sendiri.",
    TA: "தொகையைத் தேர்வு செய்யவும் அல்லது வேறு தொகையை உள்ளிடவும்.",
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
};

const tKey = (lang, key) =>
  STRINGS[key]?.[lang] || STRINGS[key]?.EN || key;

/* ---------- App ---------- */

function App() {
  const [screen, setScreen] = useState("insertCard");
  const [pin, setPin] = useState("123456");
  const [balance, setBalance] = useState(10058);
  const [accountBalance, setAccountBalance] = useState(10098);

  const [language, setLanguage] = useState("EN");
  const [languageLocked, setLanguageLocked] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const { features, loading: featuresLoading } = useAtmFeatures();
  const { prefs, loading: prefsLoading } = useAtmPreferences();
  const { setAuthenticated, setCurrentScreen, resetSession } =
    useAtmSession("demoSession");

  const loading = featuresLoading || prefsLoading;

  const t = (key) => tKey(language, key);

  const goTo = (next) => {
    setScreen(next);
    setCurrentScreen(next);
  };

  /* apply default language from prefs once (unless user changed) */
  useEffect(() => {
    if (!languageLocked && prefs.defaultLanguage) {
      setLanguage(prefs.defaultLanguage);
    }
  }, [prefs.defaultLanguage, languageLocked]);

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    setLanguageLocked(true);
    setShowLangMenu(false);
  };

  const handleDarkToggle = () => {
    setIsDark((d) => !d);
  };

  const rootClasses = [
    "atm-root",
    isDark ? "atm-root--dark" : "atm-root--light",
    prefs.fontSize === "large"
      ? "atm-root--font-lg"
      : prefs.fontSize === "xlarge"
      ? "atm-root--font-xl"
      : "atm-root--font-md",
    prefs.fontColour === "highContrast" ? "atm-root--high-contrast" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return (
      <div className="atm-root atm-root--light atm-root--font-md atm-loading">
        <div className="atm-frame">
          <div className="atm-loading-card">
            <div className="atm-spinner-coin" />
            <p>Connecting to ATM services…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <div className="atm-frame">
        {/* Header: OCBC logo + language + dark toggle */}
        <header className="atm-header atm-screen-contents">
          <div className="atm-logo-circle">
            <span className="atm-logo-mark" />
          </div>

          <div className="atm-header-right">
            <button
              type="button"
              className="atm-theme-toggle"
              onClick={handleDarkToggle}
            >
              {isDark ? "☀︎ Light" : "🌙 Dark"}
            </button>

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
                  <button onClick={() => handleLanguageSelect("EN")}>
                    English
                  </button>
                  <button onClick={() => handleLanguageSelect("ZH")}>
                    中文
                  </button>
                  <button onClick={() => handleLanguageSelect("MS")}>
                    Melayu
                  </button>
                  <button onClick={() => handleLanguageSelect("TA")}>
                    தமிழ்
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Flow */}

        {screen === "insertCard" && (
          <InsertCardScreen goTo={goTo} t={t} />
        )}

        {screen === "pinEntry" && (
          <PinEntryScreen
            goTo={goTo}
            t={t}
            pin={pin}
            onPinSuccess={() => setAuthenticated(true)}
          />
        )}

        {screen === "scanFace" && (
          <ScanFaceScreen goTo={goTo} t={t} />
        )}

        {screen === "mainMenu" && (
          <MainMenuScreen goTo={goTo} t={t} features={features} />
        )}

        {screen === "depositCash" && (
          <DepositCashScreen goTo={goTo} t={t} />
        )}

        {screen === "countingCash" && (
          <CountingCashScreen
            goTo={goTo}
            t={t}
            onDone={() => {
              setBalance((b) => b + 40);
              setAccountBalance((b) => b + 40);
            }}
          />
        )}

        {screen === "transactionCompleted" && (
          <TransactionCompletedScreen
            goTo={goTo}
            t={t}
            balance={balance}
          />
        )}

        {screen === "printReceipt" && (
          <PrintReceiptScreen goTo={goTo} t={t} />
        )}

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
          <ChangePinScreen goTo={goTo} t={t} onPinChanged={setPin} />
        )}

        {screen === "pinChanged" && (
          <PinChangedScreen goTo={goTo} t={t} />
        )}

        {screen === "thankYou" && (
          <ThankYouScreen goTo={goTo} t={t} onReset={resetSession} />
        )}
      </div>
    </div>
  );
}

/* ---------- Screens ---------- */

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
      goTo("scanFace");
    } else {
      setError(t("pin_error"));
      setInputPin("");
    }
  };

  const handleForgotPin = () => {
    setInputPin("");
    setError("");
    goTo("scanFace");
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

  if (features.changePin) {
    buttons.push(
      <button
        key="changePin"
        className="atm-menu-btn"
        onClick={() => goTo("changePin")}
      >
        {t("change_pin")}
      </button>
    );
  }

  // Always allow Exit
  buttons.push(
    <button
      key="exit"
      className="atm-menu-btn atm-menu-btn--ghost"
      onClick={() => goTo("thankYou")}
    >
      {t("exit")}
    </button>
  );

  const onlyExit = buttons.length === 1;

  return (
    <main className="atm-main">
      <div className="atm-card atm-screen-contents">
        <h2 className="atm-card-title center">{t("main_menu_title")}</h2>
        <p className="atm-subtitle center">{t("main_menu_subtitle")}</p>

        {onlyExit ? (
          <p className="atm-helper-text center">
            No services available. Please configure ATM services in your
            mobile banking app.
          </p>
        ) : (
          <div className="atm-menu-grid">{buttons}</div>
        )}
      </div>
    </main>
  );
}

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
            <span className="atm-subtitle">{t("your_balance_label")}</span>
            <div className="atm-balance-amount">
              ${balance.toLocaleString("en-US")}
            </div>
          </div>
        </div>

        <div className="atm-card-footer right">
          <button
            className="atm-secondary-btn"
            onClick={() => goTo("anotherTransaction")}
          >
            {t("btn_back")}
          </button>
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
            <span className="atm-subtitle">{t("your_balance_label")}</span>
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
  const quickAmounts = [20, 50, 80, 100, 200];

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

function ChangePinScreen({ goTo, t, onPinChanged }) {
  const [step, setStep] = useState(1);
  const [firstPin, setFirstPin] = useState("");
  const [secondPin, setSecondPin] = useState("");
  const [error, setError] = useState("");

  const handleFirstChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFirstPin(value);
  };

  const handleSecondChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setSecondPin(value);
  };

  const nextStep = () => {
    if (step === 1) {
      if (firstPin.length !== 6) {
        setError("PIN must be 6 digits.");
        return;
      }
      setError("");
      setStep(2);
    } else {
      if (secondPin !== firstPin) {
        setError("PINs do not match. Please try again.");
        setSecondPin("");
        return;
      }
      setError("");
      onPinChanged(firstPin);
      goTo("pinChanged");
    }
  };

  const subtitleKey =
    step === 1 ? "change_pin_subtitle" : "change_pin_subtitle_confirm";
  const currentValue = step === 1 ? firstPin : secondPin;
  const onChange = step === 1 ? handleFirstChange : handleSecondChange;

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      nextStep();
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

        <h2 className="atm-card-title center">{t("change_pin_title")}</h2>
        <p className="atm-subtitle center">{t(subtitleKey)}</p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={currentValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="atm-pin-input"
        />

        {error && <p className="atm-pin-error">{error}</p>}

        <div className="atm-card-footer center">
          <button className="atm-primary-btn" onClick={nextStep}>
            {step === 1 ? t("btn_next") : t("btn_confirm")}
          </button>
          <button
            className="atm-secondary-btn"
            onClick={() => goTo("mainMenu")}
          >
            {t("btn_cancel")}
          </button>
        </div>
      </div>
    </main>
  );
}

function PinChangedScreen({ goTo, t }) {
  return (
    <main className="atm-main">
      <div className="atm-card atm-screen-contents">
        <h2 className="atm-card-title center">{t("pin_changed_title")}</h2>

        <div className="atm-big-check">✔</div>

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

export default App;
