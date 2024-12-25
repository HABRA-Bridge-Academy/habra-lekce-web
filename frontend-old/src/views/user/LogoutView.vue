<script lang="ts">
import { useAuthStore } from '@/stores/Auth';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LogoutView',
  setup() {
    const userStore = useAuthStore();
    const router = useRouter();

    onMounted(async () => {
      try {
        await userStore.logout();  // Trigger the logout action
        router.push({ name: 'home' });  // Programmatically redirect to the home route
      } catch (error) {
        console.error('Logout failed', error);  // Handle any errors during logout
      }
    });

    return {};
  }
});
</script>