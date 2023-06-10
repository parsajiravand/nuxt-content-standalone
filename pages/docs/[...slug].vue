<script setup lang="ts">
import { NavItem } from "@nuxt/content/dist/runtime/types";

const { data: navigationPure } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
interface Navigation {
  _path: string;
  title: string;
  children: Navigation[];
  isOpen: boolean;
}

let navigation: NavItem[] = [];
if (!navigationPure.value) {
  navigation = [];
} else {
  navigation = navigationPure.value[0]?.children || [];
}

const { path } = useRoute();
const { data: contentPath } = await useAsyncData(
  `content-${path}`,
  async () => {
    // fetch document where the document path matches with the cuurent route
    let article = queryContent().where({ _path: path }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent()
      .only(["_path", "title", "description", "lang"])
      .sort({ date: 1 })
      .findSurround(path);

    return {
      article: await article,
      surround: await surround,
    };
  }
);

// show items in collapse if the current route is the same as the link path
const route = useRoute();
const isCurrentRoute = (link: NavItem) => {
  return route.path === link._path;
};
function setParentOpenStatus(navigation, childPath) {
  for (const link of navigation) {
    if (link._path === childPath) {
      link.isOpen = true;
      break;
    } else if (link.children) {
      setParentOpenStatus(link.children, childPath);
      if (link.children.some((child) => child.isOpen)) {
        link.isOpen = true;
      }
    }
  }
}

if (contentPath.value?.article) {
  const childPath = contentPath.value.article._path;
  setParentOpenStatus(navigation, childPath);
}


// toggle collapse item
const toggleCollapse = (link: NavItem) => {
  link.isOpen = !link.isOpen;
};
const toggleChildCollapse = (link: NavItem) => {
  link.isOpen = !link.isOpen;
};
// check contentBar if it is in viewport
const contentBar = computed(() => {
  if (contentPath.value?.article?.contentBar === false) {
    return false;
  } else {
    return true;
  }
});
// destrucure `prev` and `next` value from contentPath
const [prev, next]: any = contentPath.value?.surround;

const topPosition = ref(150);
const getHeaderHeight = () => {
  const header = document.querySelector("header");
  if (header) {
    return header.clientHeight;
  } else {
    return 0;
  }
};

onMounted(() => {
  topPosition.value = getHeaderHeight() + 10;
});
</script>
<template>
  <main class="prose flex flex-row">
    <!-- create navigation ul with tailwind -->

    <nav
      :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
      class="flex flex-col w-1/5 sticky h-3/4 doc-sidebar"
    >
      <ul class="shadow rounded px-2 py-6 mx-2 bg-gray-100 dark:bg-gray-800">
        <li
          v-for="link of navigation"
          :key="link._path"
          class="py-2 dark:text-gray-100"
        >
          <div
            @click="toggleCollapse(link)"
            class="flex items-center cursor-pointer"
          >
            <span class="mr-2">
              <svg
                :class="{ 'rotate-90': link.isOpen }"
                class="w-4 h-4 transition-transform duration-300 transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span
              class="text-gray-800 dark:text-gray-100 hover:text-indigo-500"
            >
              {{ link.title }}
            </span>
          </div>
          <Sidebar v-if="link.isOpen" :items="link.children"></Sidebar>
        </li>
      </ul>
    </nav>

    <div class="h-3/4 sticky" :class="!contentBar ? 'w-4/5' : 'w-3/5'">
      <ContentDoc class="dark:bg-gray-800 bg-gray-100 p-4 rounded" />
      <!-- PrevNext Component -->
      <PrevNext
        :prev="prev"
        :next="next"
        class="dark:bg-gray-800 bg-gray-100 p-4 rounded my-5"
      />
    </div>
    <aside
      class="mx-2 w-1/5 sticky h-3/4"
      :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
      v-if="contentBar"
    >
      <div class="">
        <!-- Toc Component -->
        <TableOfContent :links="data?.article.body.toc.links" />
        <!-- <Toc :links="data?.article.body.toc.links" /> -->
      </div>
    </aside>
  </main>
</template>
<style scoped>
.doc-sidebar {
  @apply max-h-[calc(100vh-6rem)] overflow-auto;
}
</style>
