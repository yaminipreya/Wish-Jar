function wishApp() {
    return {
        currentView: 'home',
        jarName: 'My Dream Jar 🫙',
        newWishText: '',
        wishes: [
            'Travel the world and see the aurora',
            'Build my dream peaceful lifestyle',
            'Be happy and grateful every single day'
        ],
        scrollToHowItWorks() {
            this.currentView = 'home';
            setTimeout(() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        },
        saveWish() {
            if (this.newWishText.trim() !== '') {
                this.wishes.unshift(this.newWishText);
                this.newWishText = '';
                this.currentView = 'dashboard';
            }
        }
    }
}
