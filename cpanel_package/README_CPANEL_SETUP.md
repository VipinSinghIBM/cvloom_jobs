================================================================================
🚀 SARKARI GLOBAL & PURPOSEHIRE - cPANEL & PHP MYSQL DEPLOYMENT GUIDE (HINDI/HINGLISH)
================================================================================

Aapko cPanel me live karne ke liye kewal 4 aasan steps follow karne hain:

--------------------------------------------------------------------------------
STEP 1: cPanel me MySQL Database aur User Create Karna
--------------------------------------------------------------------------------
1. Apne hosting ke cPanel me login karein.
2. "Databases" section me jakar "MySQL Databases" ya "MySQL Database Wizard" par click karein.
3. Database ka naam dalein (Jaise: sarkaridb) -> "Next Step" dabayein.
   * Note: Pura naam kuch aisa banega: cpaneluser_sarkaridb
4. Ek naya User create karein:
   - Username: jaise sarkaridb_user (Pura naam: cpaneluser_sarkaridb_user)
   - Password: Ek strong password banayein (aur use copy kar lein)
   - "Create User" par click karein.
5. "Add User to Database" screen par "ALL PRIVILEGES" checkmark karein aur "Make Changes" dabayein.

--------------------------------------------------------------------------------
STEP 2: phpMyAdmin me "database.sql" Import Karna
--------------------------------------------------------------------------------
1. cPanel dashboard par wapas aakar "phpMyAdmin" icon par click karein.
2. Left sidebar me se apna naya banaya hua database select karein.
3. Top navigation me "Import" tab par click karein.
4. "Choose File" button dabayein aur "database.sql" file select karein.
5. Page ke niche scroll karke "Go" / "Import" button par click karein.
   * Kuch hi seconds me sabhi tables (jobs, blogs, notifications, settings, applications, subscribers) 
     aur unka sara demo & seed data automatically add ho jayega!

--------------------------------------------------------------------------------
STEP 3: "config/db.php" me Database Details Add Karna
--------------------------------------------------------------------------------
1. Apne cPanel "File Manager" me jayein -> "public_html" me "config/db.php" file ko Right Click karke "Edit" karein.
2. Niche diye gaye 3 values ko apne actual details se update karein:

   define('DB_HOST', 'localhost');
   define('DB_NAME', 'cpaneluser_sarkaridb');       // Aapka database name
   define('DB_USER', 'cpaneluser_sarkaridb_user');  // Aapka database user
   define('DB_PASS', 'AapkaPasswordYaha');          // Aapka database password

3. "Save Changes" par click karein.

--------------------------------------------------------------------------------
STEP 4: Files Upload Karna (public_html)
--------------------------------------------------------------------------------
1. cPanel "File Manager" open karein aur "public_html" folder me jayein.
2. Sari files ko upload karein:
   - index.html
   - assets/ (JS aur CSS files)
   - api.php
   - config/ (jisme db.php hai)
   - .htaccess
3. Bas ho gaya!

--------------------------------------------------------------------------------
STEP 5: Testing (Sab kuch sahi kaam kar raha hai ya nahi)
--------------------------------------------------------------------------------
1. Apne browser me visit karein:
   https://yourdomain.com/api.php?action=check_db
   Agar output me:
   {"success":true,"message":"Mubarak ho! Database successfully connected hai!"}
   aata hai, to aapka MySQL database 100% connect ho chuka hai!

2. Apni main website kholein:
   https://yourdomain.com/
   Aapki website lightning fast speed ke saath live chalegi!

3. Admin Panel access karne ke liye:
   https://yourdomain.com/ (Login with admin password, default: sarkari2026)
================================================================================
