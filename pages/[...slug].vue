<script setup lang="ts">
import SidebarLayout from "~/components/content/SidebarLayout.vue";
import { INavigation } from "~/interfaces/navigation";

const appConfig = useAppConfig();
const { data: navigationPure } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);

let navigation: INavigation[] = [];
if (!navigationPure.value) {
  navigation = [];
} else {
  if (appConfig.stand.contentRoot) {
    const fetchFolder = navigationPure.value.find((item) => {
      return item._path === appConfig.stand.contentRoot;
    })?.children as INavigation[];
    console.log(fetchFolder);

    navigation = fetchFolder || [];
  } else {
    navigation = navigationPure.value;
  }
}

const { path } = useRoute();

const { data: contentPath, error } = await useLazyAsyncData(
  `content-${path}`,
  async () => {
    // fetch document where the document path matches with the cuurent route
    let article = queryContent().where({ _path: path }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent()
      .only(["_path", "title", "description", "lang"])
      .findSurround(path);

    return {
      article: await article,
      surround: await surround,
    };
  }
);
// handeling when got error
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

// show items in collapse if the current route is the same as the link path
function setParentOpenStatus(navigation: INavigation[], childPath: string) {
  for (const link of navigation as INavigation[]) {
    if (link._path === childPath) {
      link.isOpen = true;
      break;
    } else if (link.children) {
      setParentOpenStatus(link.children, childPath);
      if (link.children.some((child: INavigation) => child.isOpen)) {
        link.isOpen = true;
      }
    }
  }
}

if (contentPath.value?.article) {
  const childPath = contentPath.value.article._path;
  setParentOpenStatus(navigation as INavigation[], childPath as string);
}

// check contentBar if it is in viewport
const contentBar = computed(() => {
  if (contentPath.value?.article?.contentBar === false) {
    return false;
  } else {
    return true;
  }
});
// destrucure `prev` and `next` value from contentPath
//add type
const [prev, next] = contentPath.value?.surround as any;

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

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
<template>
  <main class="prose flex flex-row">
    <!-- create navigation ul with tailwind -->
    <!-- create collapse for navbar on mobile size -->
    <button
      class="md:hidden fixed right-0 top-0 m-4 z-50 rounded-md"
      @click="toggleSidebar"
    >
      <svg
        class="w-8 h-8 text-gray-800 dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          v-if="!isSidebarOpen"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
        />
        <path
          v-if="isSidebarOpen"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 6H4v2h16V6zm0 5H4v2h16v-2zm0 5H4v2h16v-2z"
        />
      </svg>
    </button>
    <!-- also add backdrop and transition for navbar -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
      @click="toggleSidebar"
    ></div>
    <!-- Mobile only -->
    <div
      v-if="isSidebarOpen"
      class="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 z-50 overflow-y-auto transition-transform duration-300 transform"
    >
      <nav
        :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
        class="sticky"
      >
        <ul class="py-4 px-4" :class="topPosition > 0 ? 'pt-4' : ''">
          <SidebarLayout :navigation="navigation" />
        </ul>
      </nav>
    </div>
    <!-- Desktop only -->
    <nav
      :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
      class="hidden md:block flex-col w-1/5 sticky h-3/4 doc-sidebar"
    >
      <ul class="shadow rounded px-2 py-6 mx-2 bg-gray-100 dark:bg-gray-800">
        <SidebarLayout :navigation="navigation" />
      </ul>
    </nav>

    <div class="h-3/4" :class="!contentBar ? 'md:w-4/5' : 'md:w-3/5'">
      <ContentDoc class="dark:bg-gray-800 bg-gray-100 p-4 rounded" />
      <!-- PrevNext Component -->
      <PrevNext
        :prev="prev"
        :next="next"
        class="dark:bg-gray-800 bg-gray-100 p-4 rounded my-5"
      />
    </div>
    <aside
      class="mx-2 md:w-1/5 md:sticky h-3/4"
      :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
      v-if="contentBar"
    >
      <div class="">
        <!-- Toc Component -->
        <TableOfContent :links="contentPath?.article.body.toc.links" />
      </div>
    </aside>
  </main>
</template>
<style scoped>
.doc-sidebar {
  @apply max-h-[calc(100vh-6rem)] overflow-auto;
}
</style>
