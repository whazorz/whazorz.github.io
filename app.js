// --- 1. Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
    increment,
    addDoc,
    runTransaction,
    where
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
    getFunctions,
    httpsCallable
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-functions.js";

// --- 2. Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyBEMeJPJ6xNhHtbPZVo4q8SWxDzYZy5x4s",
    authDomain: "wdesign-9e502.firebaseapp.com",
    projectId: "wdesign-9e502",
    storageBucket: "wdesign-9e502.firebasestorage.app",
    messagingSenderId: "666272519163",
    appId: "1:666272519163:web:12d530dedfde48d2eb715e",
    measurementId: "G-7G6P6WVVP8"
};

// --- 3. Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// --- 4. Global State Variables ---
let isLoginMode = true;
let isForgotPasswordMode = false;
let currentUserId = null;
let currentUserData = null;
let listenersUnsubscribe = [];

// --- 5. Static Data ---
// (Removed staticGalleryImages - now in index.html)

// --- 6. DOM Element Getters (In HTML Order) ---

// -- Main Containers --
const loadingContainer = document.getElementById('loading-container');
const loggedOutContainer = document.getElementById('logged-out-container');
const appContainer = document.getElementById('app-container');

// -- Navigation Menus --
const authNavMenu = document.getElementById('auth-nav-menu');
const appNavMenu = document.getElementById('app-nav-menu');
const authNavGallery = document.getElementById('auth-nav-gallery');
const authNavLogin = document.getElementById('auth-nav-login');
const logoutButton = document.getElementById('logout-button');

// -- App Navigation Buttons (as an object) --
const navButtons = {
    gallery: document.getElementById('nav-gallery'),
    profile: document.getElementById('nav-profile'),
    request: document.getElementById('nav-request'),
    orders: document.getElementById('nav-orders'),
    admin: document.getElementById('nav-admin')
};

// -- App View Containers (as an object) --
const appViews = {
    gallery: document.getElementById('gallery-view-app'),
    profile: document.getElementById('profile-view'),
    request: document.getElementById('request-view'),
    orders: document.getElementById('orders-view'),
    admin: document.getElementById('admin-view')
};

// -- Auth View Elements --
const authContainer = document.getElementById('auth-container');
const authForm = document.getElementById('auth-form');
const toggleFormBtn = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const messageBox = document.getElementById('message-box');
const passwordField = document.getElementById('password-field');
const passwordInput = document.getElementById('password');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const galleryViewAuth = document.getElementById('gallery-view-auth');

// -- Profile View Elements --
const profileEmail = document.getElementById('profile-email');
const profileUid = document.getElementById('profile-uid');
const profileCoins = document.getElementById('profile-coins');
const buyCoinsMessageBox = document.getElementById('buy-coins-message-box');

// -- Request View Elements --
const requestForm = document.getElementById('request-form');
const requestCharacterName = document.getElementById('request-character-name');
const requestServerRegion = document.getElementById('request-server-region');
const requestRace = document.getElementById('request-race');
const requestClass = document.getElementById('request-class');
const requestGearSet = document.getElementById('request-gear-set');
const requestBackground = document.getElementById('request-background');
const requestExtraDetails = document.getElementById('request-extra-details');
const requestCoinBalance = document.getElementById('request-coin-balance');
const submitRequestButton = document.getElementById('submit-request-button');
const requestMessageBox = document.getElementById('request-message-box');

// -- Orders View Elements --
const ordersListContainer = document.getElementById('orders-list-container');
const noOrdersMessage = document.getElementById('no-orders-message');

// -- Admin View Elements --
const adminUserIdInput = document.getElementById('admin-user-id');
const adminCoinAmountInput = document.getElementById('admin-coin-amount');
const adminAddCoinsBtn = document.getElementById('admin-add-coins-btn');
const adminUsersList = document.getElementById('admin-users-list');
const adminNoUsers = document.getElementById('admin-no-users');
const adminOrdersList = document.getElementById('admin-orders-list');
const adminNoOrders = document.getElementById('admin-no-orders');
const adminCompletedOrdersList = document.getElementById('admin-completed-orders-list');
const adminNoCompletedOrders = document.getElementById('admin-no-completed-orders');

// --- 7. Utility Functions ---

function showMessage(box, message, isError = true) {
    box.textContent = message;
    box.className = 'fade-in p-4 rounded-md text-sm';
    if (isError) {
        box.classList.add('bg-red-100', 'dark:bg-red-900', 'text-red-700', 'dark:text-red-200');
    } else {
        box.classList.add('bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-200');
    }
    box.classList.remove('hidden');
}

function hideMessage(box) {
    box.classList.add('hidden');
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    hideMessage(messageBox);
    isForgotPasswordMode = false;
    passwordField.classList.remove('hidden');
    passwordInput.required = true;

    if (isLoginMode) {
        formTitle.textContent = 'Sign in to your account';
        toggleFormBtn.textContent = 'create a new account';
        submitButton.textContent = 'Sign In';
        forgotPasswordBtn.classList.remove('hidden');
    } else {
        formTitle.textContent = 'Create a new account';
        toggleFormBtn.textContent = 'sign in instead';
        submitButton.textContent = 'Create Account';
        forgotPasswordBtn.classList.add('hidden');
    }
}

function toggleForgotPasswordMode() {
    isForgotPasswordMode = !isForgotPasswordMode;
    hideMessage(messageBox);

    if (isForgotPasswordMode) {
        formTitle.textContent = 'Reset your password';
        submitButton.textContent = 'Send Reset Email';
        passwordField.classList.add('hidden');
        passwordInput.required = false;
        toggleFormBtn.textContent = 'back to sign in';
        isLoginMode = true;
    } else {
        formTitle.textContent = 'Sign in to your account';
        submitButton.textContent = 'Sign In';
        passwordField.classList.remove('hidden');
        passwordInput.required = true;
        toggleFormBtn.textContent = 'create a new account';
    }
}

// --- 8. View Management Functions ---

function showMainView(viewName) {
    loadingContainer.classList.add('hidden');
    loggedOutContainer.classList.add('hidden');
    appContainer.classList.add('hidden');
    
    authNavMenu.classList.add('hidden');
    appNavMenu.classList.add('hidden');

    if (viewName === 'loading') {
        loadingContainer.classList.remove('hidden');
    } else if (viewName === 'auth') {
        loggedOutContainer.classList.remove('hidden');
        authNavMenu.classList.remove('hidden');
        showLoggedOutView('login');
        isLoginMode = true;
        isForgotPasswordMode = false;
        toggleAuthMode();
        toggleAuthMode();
    } else if (viewName === 'app') {
        appContainer.classList.remove('hidden');
        appNavMenu.classList.remove('hidden');
    }
}

function showLoggedOutView(viewName) {
    if (viewName === 'login') {
        authContainer.classList.remove('hidden');
        galleryViewAuth.classList.add('hidden');
        authNavLogin.classList.add('active');
        authNavGallery.classList.remove('active');
    } else if (viewName === 'gallery') {
        authContainer.classList.add('hidden');
        galleryViewAuth.classList.remove('hidden');
        authNavLogin.classList.remove('active');
        authNavGallery.classList.add('active');
    }
}

function showAppView(viewId) {
    Object.values(appViews).forEach(view => view.classList.add('hidden'));
    Object.values(navButtons).forEach(btn => btn.classList.remove('active'));
    
    if (appViews[viewId]) {
        appViews[viewId].classList.remove('hidden');
    }
    if (navButtons[viewId]) {
        navButtons[viewId].classList.add('active');
    }
}

// --- 9. Rendering Functions ---

// (Removed renderGalleryGrid - content is now in index.html)

function createUserElement(user, userId) {
    const userEl = document.createElement('div');
    userEl.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm';
    
    const email = document.createElement('p');
    email.textContent = user.email;
    email.className = 'font-bold text-md text-indigo-600 dark:text-indigo-400';
    if (user.isAdmin) {
        email.textContent += ' (Admin)';
        email.classList.add('text-yellow-500');
    }

    const meta = document.createElement('p');
    meta.textContent = `Coins: ${user.coins}`;
    meta.className = 'text-sm text-gray-700 dark:text-gray-300';
    
    const uid = document.createElement('p');
    uid.textContent = `ID: ${userId}`;
    uid.className = 'text-xs font-mono text-gray-500 dark:text-gray-400';
    
    userEl.appendChild(email);
    userEl.appendChild(meta);
    userEl.appendChild(uid);
    
    return userEl;
}

function createOrderElement(order, orderId, isAdmin) {
    const orderEl = document.createElement('div');
    orderEl.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm';
    
    // 1. Basic Order Info
    const type = document.createElement('p');
    type.textContent = order.type;
    type.className = 'font-bold text-lg text-indigo-600 dark:text-indigo-400';

    const details = document.createElement('p');
    details.textContent = order.details;
    details.className = 'font-medium text-gray-900 dark:text-white whitespace-pre-wrap mt-2';
    
    const meta = document.createElement('p');
    const date = order.createdAt ? order.createdAt.toDate().toLocaleString() : 'Pending...';
    meta.textContent = `Cost: ${order.cost} coins - On: ${date}`;
    meta.className = 'text-sm text-gray-600 dark:text-gray-400 mt-2';
    
    orderEl.appendChild(type);
    orderEl.appendChild(details);
    orderEl.appendChild(meta);

    // 2. Status & Image (Visible to User and Admin)
    const statusEl = document.createElement('div');
    statusEl.className = 'mt-2 pt-2 border-t border-gray-200 dark:border-gray-600';
    
    const statusLabel = document.createElement('span');
    statusLabel.className = 'font-bold text-lg';
    
    if (order.status === 'completed') {
        statusLabel.textContent = 'Status: Completed';
        statusLabel.classList.add('text-green-600', 'dark:text-green-400');
        statusEl.appendChild(statusLabel);
        
        if (order.imageUrl) {
            const imgLink = document.createElement('a');
            imgLink.href = order.imageUrl;
            imgLink.target = '_blank';
            imgLink.rel = 'noopener noreferrer';
            imgLink.textContent = 'View Full Image';
            imgLink.className = 'block text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1';
            statusEl.appendChild(imgLink);

            const imgPreview = document.createElement('img');
            imgPreview.src = order.imageUrl;
            imgPreview.alt = 'Completed Order Preview';
            imgPreview.className = 'mt-2 rounded-lg shadow-md w-full max-w-sm object-cover';
            statusEl.appendChild(imgPreview);
        }
    } else { // 'pending'
        statusLabel.textContent = 'Status: Pending';
        statusLabel.classList.add('text-yellow-600', 'dark:text-yellow-400');
        statusEl.appendChild(statusLabel);
    }
    orderEl.appendChild(statusEl);

    // 3. Admin-Only Controls
    if (isAdmin) {
        const user = document.createElement('p');
        user.textContent = `From: ${order.userEmail} (ID: ${order.userId})`;
        user.className = 'text-xs font-mono bg-gray-200 dark:bg-gray-800 p-1 rounded mt-2';
        orderEl.appendChild(user);

        const adminActionsEl = document.createElement('div');
        adminActionsEl.className = 'mt-2 space-y-2 border-t border-gray-300 dark:border-gray-600 pt-2';

        const imageUrlInput = document.createElement('input');
        imageUrlInput.type = 'text';
        imageUrlInput.placeholder = 'Image URL (e.g., Imgur link)';
        imageUrlInput.className = 'block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-md sm:text-sm transition';
        
        const actionButton = document.createElement('button');
        actionButton.className = 'w-full px-3 py-1 text-white text-xs font-medium rounded transition-colors duration-200';

        if (order.status === 'pending') {
            actionButton.textContent = 'Complete Order';
            actionButton.classList.add('bg-green-600', 'hover:bg-green-700');
            actionButton.onclick = () => {
                const url = imageUrlInput.value;
                completeOrder(orderId, url);
            };
        } else { // 'completed'
            imageUrlInput.value = order.imageUrl || '';
            actionButton.textContent = 'Update Link';
            actionButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
            actionButton.onclick = () => {
                const url = imageUrlInput.value;
                updateOrderLink(orderId, url); 
            };
        }
        
        adminActionsEl.appendChild(imageUrlInput);
        adminActionsEl.appendChild(actionButton);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Order';
        deleteBtn.className = 'mt-2 w-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors duration-200';
        deleteBtn.onclick = () => deleteOrder(orderId);
        
        adminActionsEl.appendChild(deleteBtn);
        orderEl.appendChild(adminActionsEl);
    }
    
    return orderEl;
}

// --- 10. Firebase Listener Functions ---

function detachListeners() {
    console.log('Detaching listeners...');
    listenersUnsubscribe.forEach(unsub => unsub());
    listenersUnsubscribe = [];
}

function setupRealtimeListeners(userId) {
    detachListeners();
    
    // 1. Listen for user document
    const userDocRef = doc(db, "users", userId);
    const unsubUser = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
            currentUserData = docSnap.data();
            console.log('User data updated:', currentUserData);
            
            profileEmail.textContent = currentUserData.email;
            profileUid.textContent = userId;
            profileCoins.textContent = currentUserData.coins;
            
            requestCoinBalance.textContent = currentUserData.coins;
            const cost = 10;
            submitRequestButton.disabled = currentUserData.coins < cost;
            
            if (currentUserData.isAdmin) {
                navButtons.admin.classList.remove('hidden');
                adminAddCoinsBtn.disabled = false;
                setupAdminListeners();
            } else {
                navButtons.admin.classList.add('hidden');
                adminAddCoinsBtn.disabled = true;
            }

        } else {
            console.error("User document not found!");
        }
    }, (error) => {
        console.error("Error listening to user doc:", error);
    });
    listenersUnsubscribe.push(unsubUser);
    
    // 2. Listen for user's orders (all statuses)
    const ordersColRef = collection(db, "orders");
    const qOrders = query(ordersColRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(qOrders, (querySnapshot) => {
        console.log('User orders data updated.');
        ordersListContainer.innerHTML = '';
        
        if (querySnapshot.empty) {
            ordersListContainer.appendChild(noOrdersMessage);
        } else {
            querySnapshot.forEach((doc) => {
                const order = doc.data();
                const orderEl = createOrderElement(order, doc.id, false);
                ordersListContainer.appendChild(orderEl);
            });
        }
    }, (error) => {
        console.error("Error listening to user orders:", error);
    });
    listenersUnsubscribe.push(unsubOrders);
}

function setupAdminListeners() {
    const ordersColRef = collection(db, "orders");
    
    // 1. Listen for ALL pending orders
    const qPendingOrders = query(ordersColRef, where("status", "==", "pending"));

    const unsubAdminOrders = onSnapshot(qPendingOrders, (querySnapshot) => {
        console.log('Admin: All PENDING orders updated.');
        adminOrdersList.innerHTML = '';
        if (querySnapshot.empty) {
            adminOrdersList.appendChild(adminNoOrders);
        } else {
            querySnapshot.forEach((doc) => {
                const order = doc.data();
                const orderEl = createOrderElement(order, doc.id, true);
                adminOrdersList.appendChild(orderEl);
            });
        }
    }, (error) => {
        console.error("Admin: Error listening to PENDING orders:", error);
    });
    listenersUnsubscribe.push(unsubAdminOrders);
    
    // 2. Listen for ALL completed orders
    const qCompletedOrders = query(ordersColRef, where("status", "==", "completed"), orderBy("completedAt", "desc"));

    const unsubAdminCompletedOrders = onSnapshot(qCompletedOrders, (querySnapshot) => {
        console.log('Admin: All COMPLETED orders updated.');
        adminCompletedOrdersList.innerHTML = '';
        if (querySnapshot.empty) {
            adminCompletedOrdersList.appendChild(adminNoCompletedOrders);
        } else {
            querySnapshot.forEach((doc) => {
                const order = doc.data();
                const orderEl = createOrderElement(order, doc.id, true);
                adminCompletedOrdersList.appendChild(orderEl);
            });
        }
    }, (error) => {
        console.error("Admin: Error listening to COMPLETED orders:", error);
    });
    listenersUnsubscribe.push(unsubAdminCompletedOrders);


    // 3. Listen for ALL users
    const usersColRef = collection(db, "users");
    const qUsers = query(usersColRef, orderBy("createdAt", "desc"));

    const unsubAdminUsers = onSnapshot(qUsers, (querySnapshot) => {
        console.log('Admin: All users updated.');
        adminUsersList.innerHTML = '';
        if (querySnapshot.empty) {
            adminNoUsers.textContent = 'No users found.';
            adminUsersList.appendChild(adminNoUsers);
        } else {
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const userEl = createUserElement(user, doc.id);
                adminUsersList.appendChild(userEl);
            });
        }
    }, (error) => {
        console.error("Admin: Error listening to users:", error);
        adminNoUsers.textContent = 'Error loading users. Check permissions.';
    });
    listenersUnsubscribe.push(unsubAdminUsers);
}

// --- 11. Firebase Action Functions (CRUD) ---

async function completeOrder(orderId, imageUrl) {
    if (!imageUrl || !imageUrl.startsWith('http')) {
        alert('Please provide a valid image URL (e.g., from Imgur).');
        return;
    }
    if (!confirm('Are you sure you want to complete this order?')) return;

    try {
        const orderDocRef = doc(db, "orders", orderId);
        await updateDoc(orderDocRef, {
            status: 'completed',
            imageUrl: imageUrl,
            completedAt: serverTimestamp()
        });
        console.log('Order completed:', orderId);
    } catch (error) {
        console.error('Error completing order:', error);
        alert('Failed to complete order.');
    }
}

async function updateOrderLink(orderId, imageUrl) {
    if (!imageUrl || !imageUrl.startsWith('http')) {
        alert('Please provide a valid image URL.');
        return;
    }
    try {
        const orderDocRef = doc(db, "orders", orderId);
        await updateDoc(orderDocRef, {
            imageUrl: imageUrl
        });
        console.log('Order link updated:', orderId);
        alert('Order link updated successfully.');
    } catch (error) {
        console.error('Error updating order link:', error);
        alert('Failed to update link.');
    }
}

async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
        const orderDocRef = doc(db, "orders", orderId);
        await deleteDoc(orderDocRef);
        console.log('Order deleted:', orderId);
    } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order.');
    }
}

async function addCoinsToUser(userId, amount) {
    const userDocRef = doc(db, "users", userId);
    adminAddCoinsBtn.disabled = true;
    adminAddCoinsBtn.textContent = "Adding...";
    try {
        await updateDoc(userDocRef, {
            coins: increment(amount)
        });
        alert(`Successfully added ${amount} coins to user ${userId}`);
        adminUserIdInput.value = '';
        adminCoinAmountInput.value = '';
    } catch (error) {
        console.error("Error adding coins:", error);
        alert("Failed to add coins. Check User ID and permissions.");
    } finally {
        adminAddCoinsBtn.disabled = false;
        adminAddCoinsBtn.textContent = "Add Coins";
    }
}

// --- 12. PayPal Functions ---

function renderPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    container.innerHTML = '';
    
    const messageBox = document.getElementById('buy-coins-message-box');
    hideMessage(messageBox);
    
    paypal.Buttons({
        // 1. Set up the transaction
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: "15 WDESIGN Coins",
                    amount: {
                        value: '5.00',
                        currency_code: 'EUR'
                    }
                }]
            });
        },

        // 2. Finalize the transaction
        onApprove: async function(data, actions) {
            // 'data.orderID' is the payment ID from PayPal
            try {
                showMessage(messageBox, "Processing your payment...", false);

                // 3. Call our secure Firebase Function
                const verifyPayPalOrder = httpsCallable(functions, 'verifyPayPalOrder');
                const result = await verifyPayPalOrder({ orderID: data.orderID });

                if (result.data.success) {
                    showMessage(messageBox, `Success! ${result.data.coinsGranted} coins were added.`, false);
                } else {
                    throw new Error("Payment verification failed.");
                }
                
            } catch (error) {
                console.error("PayPal onApprove Error:", error);
                let msg = "Payment verification failed. Please contact support.";
                if (error.message.includes("already-exists")) {
                    msg = "This payment has already been processed.";
                }
                showMessage(messageBox, msg, true);
            }
        },
        
        // 4. Handle errors
        onError: function(err) {
            console.error("PayPal Button Error:", err);
            showMessage(messageBox, "An error occurred. Please try again.", true);
        }
    }).render('#paypal-button-container');
}

// --- 13. Event Listeners ---

// -- Auth Form Listeners --
toggleFormBtn.addEventListener('click', () => {
    if (isForgotPasswordMode) {
        toggleForgotPasswordMode();
    } else {
        toggleAuthMode();
    }
});

forgotPasswordBtn.addEventListener('click', toggleForgotPasswordMode);

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage(messageBox);

    const email = authForm.email.value;
    const password = authForm.password.value;
    
    submitButton.disabled = true;

    if (isForgotPasswordMode) {
        submitButton.textContent = 'Sending...';
        try {
            await sendPasswordResetEmail(auth, email);
            showMessage(messageBox, 'Password reset email sent! Please check your inbox (and spam folder).', false);
        } catch (error) {
            console.error('Password Reset Error:', error);
            let friendlyMessage = 'Failed to send reset email. Is the email correct?';
            if (error.code === 'auth/user-not-found') {
                friendlyMessage = 'No user found with this email address.';
            }
            showMessage(messageBox, friendlyMessage, true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Reset Email';
        }
        return;
    }

    submitButton.textContent = isLoginMode ? 'Signing In...' : 'Creating...';
    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created:', userCredential.user);
            
            const userDocRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userDocRef, {
                email: userCredential.user.email,
                coins: 0,
                createdAt: serverTimestamp(),
                isAdmin: false
            });
            console.log('User document created in Firestore');
            
            showMessage(messageBox, 'Account created successfully! You are now logged in.', false);
        }
    } catch (error) {
        console.error('Auth Error:', error.code, error.message);
        let friendlyMessage = 'An unknown error occurred.';
        switch(error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                friendlyMessage = 'Invalid email or password.';
                break;
            case 'auth/email-already-in-use':
                friendlyMessage = 'This email address is already in use.';
                break;

            case 'auth/weak-password':
                friendlyMessage = 'The password is too weak (must be at least 6 characters).';
                break;
            case 'auth/invalid-email':
                friendlyMessage = 'Please enter a valid email address.';
                break;
            case 'auth/network-request-failed':
                friendlyMessage = 'Network error. Please check your connection.';
                break;
        }
        showMessage(messageBox, friendlyMessage, true);
    } finally {
        submitButton.disabled = false;
        if (isForgotPasswordMode) {
            submitButton.textContent = 'Send Reset Email';
        } else {
            submitButton.textContent = isLoginMode ? 'Sign In' : 'Create Account';
        }
    }
});

// -- Navigation Listeners --
logoutButton.addEventListener('click', async () => {
    await signOut(auth);
});

navButtons.gallery.addEventListener('click', () => showAppView('gallery'));
navButtons.profile.addEventListener('click', () => showAppView('profile'));
navButtons.request.addEventListener('click', () => showAppView('request'));
navButtons.orders.addEventListener('click', () => showAppView('orders'));
navButtons.admin.addEventListener('click', () => showAppView('admin'));

authNavGallery.addEventListener('click', () => showLoggedOutView('gallery'));
authNavLogin.addEventListener('click', () => showLoggedOutView('login'));

// -- Admin "Add Coins" Button Listener --
adminAddCoinsBtn.addEventListener('click', async () => {
    const userId = adminUserIdInput.value;
    const amount = parseInt(adminCoinAmountInput.value, 10);

    if (!userId || isNaN(amount)) {
        alert("Please enter a User ID and a valid number for the amount.");
        return;
    }

    if (currentUserData && currentUserData.isAdmin) {
        await addCoinsToUser(userId, amount);
    } else {
        alert("You do not have permission to do this.");
    }
});

// -- Request Form Listener --
requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage(requestMessageBox);
    
    const charName = requestCharacterName.value;
    const serverRegion = requestServerRegion.value;
    const race = requestRace.value;
    const charClass = requestClass.value;
    const gearSet = requestGearSet.value;
    const background = requestBackground.value;
    const extraDetails = requestExtraDetails.value;
    
    const cost = 10;
    
    if (!charName || !serverRegion || !race || !charClass || !gearSet || !background) {
        showMessage(requestMessageBox, "Please fill in all required fields.", true);
        return;
    }
    
    if (currentUserData.coins < cost) {
        showMessage(requestMessageBox, "You don't have enough coins!", true);
        return;
    }
    
    submitRequestButton.disabled = true;
    submitRequestButton.textContent = 'Processing...';

    const details = `Character: ${charName} (${serverRegion})
Race: ${race}
Class: ${charClass}
Gear/Transmog: ${gearSet}
Background: ${background}
Extra Details: ${extraDetails || 'None'}`;

    try {
        const userDocRef = doc(db, "users", currentUserId);
        const newOrderRef = doc(collection(db, "orders"));

        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) throw "User document does not exist!";
            
            const newCoins = userDoc.data().coins - cost;
            if (newCoins < 0) throw "Not enough coins!";
            
            transaction.update(userDocRef, { coins: newCoins });
            
            transaction.set(newOrderRef, {
                type: "WoW Banner",
                details: details,
                cost: cost,
                createdAt: serverTimestamp(),
                status: 'pending',
                userId: currentUserId,
                userEmail: currentUserData.email
            });
        });
        
        showMessage(requestMessageBox, 'Order submitted successfully!', false);
        requestForm.reset();
        showAppView('orders');
        
    } catch (error) {
        console.error("Transaction Error:", error);
        showMessage(requestMessageBox, `Error: ${error.message || error}`, true);
    } finally {
        submitRequestButton.disabled = false;
        submitRequestButton.textContent = `Submit Request (${cost} Coins)`;
    }
});

// --- 14. App Initialization ---

// -- Main Auth State Observer --
onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed. User:', user ? user.uid : 'null');
    if (user) {
        currentUserId = user.uid;
        setupRealtimeListeners(user.uid);
        showMainView('app');
        showAppView('gallery'); 
        
        // Render PayPal button when user is logged in
        renderPayPalButton();
        
    } else {
        currentUserId = null;
        currentUserData = null;
        detachListeners();
        showMainView('auth');
        showLoggedOutView('gallery');
    }
});

// -- Initial Page Load --
// (Removed renderGalleryGrid() call)
showMainView('loading');