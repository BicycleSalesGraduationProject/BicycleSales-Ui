$(function () {

  'use strict';

  var $distpicker = $('#distpicker');
  $distpicker.Distpicker({
    province: '福建省',
    city: '厦门市',
    district: '思明区'
  });

  $('#reset').click(function () {
    $distpicker.Distpicker('reset');
  });

  $('#reset-deep').click(function () {
    $distpicker.Distpicker('reset', true);
  });

  $('#destroy').click(function () {
    $distpicker.Distpicker('destroy');
  });

  $('#distpicker1').Distpicker();

  $('#distpicker2').Distpicker({
    province: '---- 所在省 ----',
    city: '---- 所在市 ----',
    district: '---- 所在区 ----'
  });

  $('#distpicker3').Distpicker({
    province: '浙江省',
    city: '杭州市',
    district: '西湖区'
  });

  $('#distpicker4').Distpicker({
    placeholder: false
  });

  $('#distpicker5').Distpicker({
    autoSelect: false
  });

});
