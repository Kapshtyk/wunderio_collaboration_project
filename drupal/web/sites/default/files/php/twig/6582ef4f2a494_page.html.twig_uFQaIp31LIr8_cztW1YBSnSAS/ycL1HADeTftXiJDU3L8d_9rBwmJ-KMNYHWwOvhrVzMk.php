<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/gin/templates/page/page.html.twig */
class __TwigTemplate_7e9e8138c102757853f7899440e68f4f extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 42
        $context["page_title_block"] = ($this->sandbox->ensureToStringAllowed(($context["active_admin_theme"] ?? null), 42, $this->source) . "_page_title");
        // line 43
        $context["local_actions_block"] = ($this->sandbox->ensureToStringAllowed(($context["active_admin_theme"] ?? null), 43, $this->source) . "_local_actions");
        // line 44
        echo "
<div class=\"gin-secondary-toolbar layout-container\">
  <div class=\"gin-breadcrumb-wrapper\">
  ";
        // line 47
        if ((($context["route_name"] ?? null) == "entity.node.canonical")) {
            // line 48
            echo "    <div class=\"region region-breadcrumb gin-region-breadcrumb\">
      <nav class=\"breadcrumb\" role=\"navigation\" aria-labelledby=\"system-breadcrumb\">
        <h2 id=\"system-breadcrumb\" class=\"visually-hidden\">";
            // line 50
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("Breadcrumb"));
            echo "</h2>
        <ol class=\"breadcrumb__list\">
          <li class=\"breadcrumb__item\">
            ";
            // line 53
            if ((($context["entity_edit_url"] ?? null) && ($context["entity_title"] ?? null))) {
                // line 54
                echo "              <a class=\"breadcrumb__link gin-back-to-admin\" href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["entity_edit_url"] ?? null), 54, $this->source), "html", null, true);
                echo "\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("Edit %title", ["%title" => ($context["entity_title"] ?? null)]));
                echo "</a>
            ";
            } else {
                // line 56
                echo "              <a class=\"breadcrumb__link gin-back-to-admin\" href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\Core\Template\TwigExtension']->getPath("system.admin_content"));
                echo "\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("Back to Administration"));
                echo "</a>
            ";
            }
            // line 58
            echo "          </li>
        </ol>
      </nav>
    </div>
  ";
        } else {
            // line 63
            echo "    ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "breadcrumb", [], "any", false, false, true, 63), 63, $this->source), "html", null, true);
            echo "
  ";
        }
        // line 65
        echo "  </div>
  ";
        // line 66
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "gin_secondary_toolbar", [], "any", false, false, true, 66), 66, $this->source), "html", null, true);
        echo "
</div>

<div class=\"region-sticky-watcher\"></div>

<header class=\"region region-sticky\">
  <div class=\"layout-container region-sticky__items\">
    <div class=\"region-sticky__items__inner\">
      ";
        // line 74
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed((($__internal_compile_0 = twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header", [], "any", false, false, true, 74)) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess ? ($__internal_compile_0[($context["page_title_block"] ?? null)] ?? null) : null), 74, $this->source), "html", null, true);
        echo "
      ";
        // line 75
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed((($__internal_compile_1 = twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 75)) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess ? ($__internal_compile_1[($context["local_actions_block"] ?? null)] ?? null) : null), 75, $this->source), "html", null, true);
        echo "
    </div>
  </div>
</header>

<div class=\"sticky-shadow\"></div>

<div class=\"content-header clearfix\">
  <div class=\"layout-container\">
    ";
        // line 84
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->extensions['Drupal\Core\Template\TwigExtension']->withoutFilter($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header", [], "any", false, false, true, 84), 84, $this->source), $this->sandbox->ensureToStringAllowed(($context["page_title_block"] ?? null), 84, $this->source)), "html", null, true);
        echo "
  </div>
</div>

<div class=\"layout-container\">
  ";
        // line 89
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "pre_content", [], "any", false, false, true, 89), 89, $this->source), "html", null, true);
        echo "
  <main class=\"page-content clearfix\" role=\"main\">
    <div class=\"visually-hidden\"><a id=\"main-content\" tabindex=\"-1\"></a></div>
    ";
        // line 92
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "highlighted", [], "any", false, false, true, 92), 92, $this->source), "html", null, true);
        echo "
    ";
        // line 93
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "help", [], "any", false, false, true, 93)) {
            // line 94
            echo "      <div class=\"help\">
        ";
            // line 95
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "help", [], "any", false, false, true, 95), 95, $this->source), "html", null, true);
            echo "
      </div>
    ";
        }
        // line 98
        echo "    ";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->extensions['Drupal\Core\Template\TwigExtension']->withoutFilter($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 98), 98, $this->source), $this->sandbox->ensureToStringAllowed(($context["local_actions_block"] ?? null), 98, $this->source)), "html", null, true);
        echo "
  </main>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/contrib/gin/templates/page/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  150 => 98,  144 => 95,  141 => 94,  139 => 93,  135 => 92,  129 => 89,  121 => 84,  109 => 75,  105 => 74,  94 => 66,  91 => 65,  85 => 63,  78 => 58,  70 => 56,  62 => 54,  60 => 53,  54 => 50,  50 => 48,  48 => 47,  43 => 44,  41 => 43,  39 => 42,);
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Claro's theme implementation to display a single Drupal page.
 *
 * The doctype, html, head, and body tags are not in this template. Instead
 * they can be found in the html.html.twig template normally located in the
 * core/modules/system directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - base_path: The base URL path of the Drupal installation. Will usually be
 *   \"/\" unless you have installed Drupal in a sub-directory.
 * - is_front: A flag indicating if the current page is the front page.
 * - logged_in: A flag indicating if the user is registered and signed in.
 * - is_admin: A flag indicating if the user has permission to access
 *   administration pages.
 *
 * Site identity:
 * - front_page: The URL of the front page. Use this instead of base_path when
 *   linking to the front page. This includes the language domain or prefix.
 *
 * Page content (in order of occurrence in the default page.html.twig):
 * - node: Fully loaded node, if there is an automatically-loaded node
 *   associated with the page and the node ID is the second argument in the
 *   page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - page.header: Items for the header region.
 * - page.pre_content: Items for the pre-content region.
 * - page.breadcrumb: Items for the breadcrumb region.
 * - page.highlighted: Items for the highlighted region.
 * - page.help: Dynamic help text, mostly for admin pages.
 * - page.content: The main content of the current page.
 *
 * @see template_preprocess_page()
 * @see html.html.twig
 */
#}
{% set page_title_block = active_admin_theme ~ '_page_title' %}
{% set local_actions_block = active_admin_theme ~ '_local_actions' %}

<div class=\"gin-secondary-toolbar layout-container\">
  <div class=\"gin-breadcrumb-wrapper\">
  {% if route_name == 'entity.node.canonical' %}
    <div class=\"region region-breadcrumb gin-region-breadcrumb\">
      <nav class=\"breadcrumb\" role=\"navigation\" aria-labelledby=\"system-breadcrumb\">
        <h2 id=\"system-breadcrumb\" class=\"visually-hidden\">{{ 'Breadcrumb'|t }}</h2>
        <ol class=\"breadcrumb__list\">
          <li class=\"breadcrumb__item\">
            {% if entity_edit_url and entity_title %}
              <a class=\"breadcrumb__link gin-back-to-admin\" href=\"{{ entity_edit_url }}\">{{ 'Edit %title'|t({ '%title': entity_title }) }}</a>
            {% else %}
              <a class=\"breadcrumb__link gin-back-to-admin\" href=\"{{ path('system.admin_content') }}\">{{ 'Back to Administration'|t }}</a>
            {% endif %}
          </li>
        </ol>
      </nav>
    </div>
  {% else %}
    {{ page.breadcrumb }}
  {% endif %}
  </div>
  {{ page.gin_secondary_toolbar }}
</div>

<div class=\"region-sticky-watcher\"></div>

<header class=\"region region-sticky\">
  <div class=\"layout-container region-sticky__items\">
    <div class=\"region-sticky__items__inner\">
      {{ page.header[page_title_block] }}
      {{ page.content[local_actions_block] }}
    </div>
  </div>
</header>

<div class=\"sticky-shadow\"></div>

<div class=\"content-header clearfix\">
  <div class=\"layout-container\">
    {{ page.header|without(page_title_block) }}
  </div>
</div>

<div class=\"layout-container\">
  {{ page.pre_content }}
  <main class=\"page-content clearfix\" role=\"main\">
    <div class=\"visually-hidden\"><a id=\"main-content\" tabindex=\"-1\"></a></div>
    {{ page.highlighted }}
    {% if page.help %}
      <div class=\"help\">
        {{ page.help }}
      </div>
    {% endif %}
    {{ page.content|without(local_actions_block) }}
  </main>
</div>
", "themes/contrib/gin/templates/page/page.html.twig", "/app/drupal/web/themes/contrib/gin/templates/page/page.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 42, "if" => 47);
        static $filters = array("t" => 50, "escape" => 54, "without" => 84);
        static $functions = array("path" => 56);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['t', 'escape', 'without'],
                ['path']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
