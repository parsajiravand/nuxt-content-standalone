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

    navigation = fetchFolder || [];
  } else {
    navigation = navigationPure.value;
  }
}

const { path } = useRoute();
const router = useRouter();
const { data: contentPath, error } = await useAsyncData(
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
// handeling when got error (404)
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

// check contentbar if it is in viewport
const contentbar = computed(() => {
  if (contentPath.value?.article?.toc === false) {
    return false;
  } else {
    return true;
  }
});
const sidebar = computed(() => {
  if (contentPath.value?.article?.aside === false) {
    return false;
  } else {
    return true;
  }
});
const layout = computed(() => {
  if (contentPath.value?.article?.layout) {
    return contentPath.value?.article?.layout;
  } else {
    return appConfig.stand.defaultLayout;
  }
});
const surround = computed(() => {
  if (contentPath.value?.article?.surround) {
    return contentPath.value?.article?.surround;
  } else {
    return false;
  }
});
const fluid = computed(() => {
  if (contentPath.value?.article?.fluid) {
    return contentPath.value?.article?.fluid;
  } else {
    return false;
  }
});

const redirect = () => {
  if (contentPath.value?.article?.redirect) {
    router.push(contentPath.value?.article?.redirect);
  } else {
    return false;
  }
};
const handelContentSize = computed(() => {
  const contentbarAndSidebar = !contentbar.value && !sidebar.value;
  if (contentbarAndSidebar || fluid.value) {
    return "w-full";
  } else if (!contentbar.value) {
    return "content-width-with-sidebar";
  } else {
    return "content-width";
  }
});
redirect();
// destrucure `prev` and `next` value from contentPath
//add type
const [prev, next] = contentPath.value?.surround as [
  INavigation | undefined,
  INavigation | undefined
];

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
  <NuxtLayout :name="layout">
    <main class="prose">
      <!-- create navigation ul with tailwind -->
      <!-- create collapse for navbar on mobile size -->
      <button
        class="toggle-sidebar"
        @click="toggleSidebar"
        v-if="sidebar || contentbar"
      >
        <svg
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
      <div v-if="isSidebarOpen" class="backdrop" @click="toggleSidebar"></div>
      <!-- Mobile only -->
      <div v-if="isSidebarOpen" class="mobile-sidebar">
        <nav
          v-if="sidebar && !fluid"
          :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
          class=""
        >
          <header class="toc-header m-4">
            <h3 class="">Menu</h3>
          </header>
          <ul class="sidebar" :class="topPosition > 0 ? 'sidebar-has-top' : ''">
            <SidebarLayout :navigation="navigation" />
          </ul>
        </nav>
        <aside
          class="p-4"
          :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
          v-if="contentbar && !fluid"
        >
          <nav class="">
            <header class="toc-header">
              <h3 class="">Table of contents</h3>
            </header>
            <!-- Toc Component -->
            <TableOfContent :links="contentPath?.article.body.toc.links" />
          </nav>
        </aside>
      </div>
      <!-- Desktop only -->
      <nav
        v-if="sidebar && !fluid"
        :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
        class="doc-sidebar"
      >
        <ul class="desk-sidebar">
          <SidebarLayout :navigation="navigation" />
        </ul>
      </nav>

      <div
        class="custom-content"
        :class="handelContentSize"
        :style="topPosition > 0 ? 'margin-top: ' + topPosition + 'px' : ''"
      >
        <ContentDoc
          class="content-doc dark:bg-gray-800 bg-gray-50 p-4 rounded"
        />
        <!-- PrevNext Component -->
        <PrevNext
          :prev="prev"
          :next="next"
          class="prev-next"
          v-if="surround && !fluid"
        />
      </div>
      <aside
        class="aside-toc md:block hidden"
        :style="topPosition > 0 ? 'top: ' + topPosition + 'px' : ''"
        v-if="contentbar && !fluid"
      >
        <nav class="toc">
          <header class="toc-header">
            <h3 class="">Table of contents</h3>
          </header>
          <!-- Toc Component -->
          <TableOfContent :links="contentPath?.article.body.toc.links" />
        </nav>
      </aside>
    </main>
  </NuxtLayout>
</template>
<style scoped>
.sticky-position {
  @apply sticky;
}
.prose {
  @apply flex flex-row;
}
.prose .toggle-sidebar {
  @apply md:hidden fixed right-0 top-0 m-4 z-50 rounded-md;
}
.prose .toggle-sidebar svg {
  @apply w-8 h-8 text-gray-800 dark:text-gray-100;
}
.prose .backdrop {
  @apply fixed inset-0 bg-gray-800 bg-opacity-50 z-40;
}
.prose .mobile-sidebar {
  @apply fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 z-50 overflow-y-auto transition-transform duration-300 transform;
}
.sidebar {
  @apply py-4 px-4;
}
.sidebar-has-top {
  @apply pt-4;
}
.doc-sidebar {
  @apply max-h-[calc(100vh-6rem)] overflow-auto hidden md:block flex-col w-1/5 sticky h-3/4;
}
.desk-sidebar {
  @apply shadow rounded px-2 py-6 mx-2 bg-gray-50 dark:bg-gray-800;
}
.custom-content {
  @apply dark:text-gray-50 h-3/4;
}
.content-width-with-sidebar {
  @apply md:w-4/5;
}
.content-width {
  @apply md:w-3/5;
}
.custom-content p {
  @apply dark:text-gray-100;
}

.prev-next {
  @apply dark:bg-gray-800 bg-gray-50 p-4 rounded my-5;
}
.toc {
  @apply py-4 px-2  rounded dark:bg-gray-800 dark:border-gray-700 bg-gray-50;
  @apply max-h-[calc(100vh-6rem)] overflow-auto;
}

.toc-header {
  @apply pb-2 mb-2 border-b border-slate-200 dark:text-gray-50;
}
.toc-header h3 {
  @apply text-lg font-semibold;
}
.aside-toc {
  @apply mx-2 md:w-1/5 md:sticky h-3/4;
}
</style>
